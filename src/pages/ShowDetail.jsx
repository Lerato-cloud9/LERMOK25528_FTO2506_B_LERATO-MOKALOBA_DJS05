
// useParams = get the id from the URL
// useNavigate = move between pages
// useLocation = get extra data from the previous page
// styles imported from the CSS module for this page

import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import styles from './ShowDetail.module.css';

/**
 * ShowDetail - This page shows all the info about one podcast
 * like its seasons and episodes.
 */
export default function ShowDetail() {
  const { id } = useParams();           // Get the show ID from the URL (example: /show/3 → id = 3)
  const navigate = useNavigate();       // Lets us go back or move to another page
  const location = useLocation();       // Gets any extra data sent from the previous page 
  
  const [showData, setShowData] = useState(null);       // Store the full show info from the API
  const [previewData, setPreviewData] = useState(null); // Store the preview data that was passed from PodcastCard
  const [error, setError] = useState(null);             // For showing a loading screen while fetching data
  const [selectedSeason, setSelectedSeason] = useState(1); // Tracks which season the user picked (default is season 1)

  useEffect(() => {                       // Function that gets all the data for this show
    const fetchShowData = async () => {   // Start loading and clear any old errors
      setLoading(true); 
      setError(null);
      
      try {
        // Fetch preview data (has genres and description)
        const previewResponse = await fetch('https://podcast-api.netlify.app/shows');
        if (!previewResponse.ok) throw new Error('Failed to fetch shows');   // Check if the request worked
        const previews = await previewResponse.json();                       // Change the response into usable JSON
        const preview = previews.find(p => p.id === id);                     // Find the preview for the show that matches the id in the URL
        setPreviewData(preview);                                             // Save the preview data

        // Fetch full show data (this includes all seasons and episodes)
        const showResponse = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!showResponse.ok) throw new Error('Failed to fetch show details');  // Check if the request worked
        const fullData = await showResponse.json();                             // Convert the response to JSON
        setShowData(fullData);     // Save the full show data in state
        setSelectedSeason(1);      // Start by showing season 1
      } catch (err) {              // If anything goes wrong, show the error
        setError(err.message);
      } finally {
        setLoading(false);         // Stop the loading screen
      }
    };

// Mapping of genre IDs to their names
// This helps display the genre name instead of just the numbe

    if (id) fetchShowData();
  }, [id]);

  const genreMap = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family'
  };

  /**
   * Formats duration from seconds to "X min" format
   */
  const formatDuration = (seconds) => {       
    if (!seconds) return '45 min';            // default value if data is missing
    const minutes = Math.floor(seconds / 60); // convert seconds to minutes
    return `${minutes} min`;                  // return the calculated minutes
  };

/**
 * Converts a date string into a readable format like "Jan 1, 2024"
 * If the date string is missing, it creates a default date using the index
 */
  const formatEpisodeDate = (dateString, index) => {
    if (!dateString) {
    // Use a default date: Jan 1, 2024, Jan 2, etc.
      const date = new Date(2024, 0, index + 1);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    // Convert the real date string to a readable format
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Show a loading screen while fetching data
  if (loading) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div className="spinner"></div>
          <p>Loading show details...</p>
        </div>
      </>
    );
  }

  // Show an error message if something went wrong or data is missing
  if (error || !showData || !previewData) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>⚠️ Error Loading Show</h2>
          <p>{error || 'Show not found'}</p>
          <button onClick={() => navigate('/')} style={{ padding: '10px 20px', marginTop: '20px' }}> {/* Button to go back to the homepage */}
            ← Back to Homepage
          </button>
        </div>
      </>
    );
  }

 // Get the names of all genres for this show using the genreMap
// If a genre ID is not in the map, show "Genre {id}" as a fallback
  const genreNames = previewData.genres?.map(id => genreMap[id] || `Genre ${id}`) || [];
  const currentSeason = showData.seasons?.find(s => s.season === selectedSeason);                 // Find the currently selected season from the full show data
  const totalEpisodes = showData.seasons?.reduce((total, s) => total + s.episodes.length, 0) || 0;// Count the total number of episodes across all seasons

  return (
    <>
    {/* Page header */}
      <Header />

      {/* Main page container */}
      <div className={styles.page}>

        {/* Back button to go to the previous page */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Show image and info section */}
        <div className={styles.header}>
          <img 
          src={showData.image} 
          alt={showData.title} 
          className={styles.image} />
          
          <div className={styles.info}>
            <h1>{showData.title}</h1>
            
            {/* Use description from preview data */}
            <p className={styles.description}>{previewData.description}</p>

            {/* Meta information like genres */}
            <div className={styles.meta}>
              <div>
                <h3>GENRES</h3>

            {/* Display all genre names as tags */}   
                <div className={styles.genres}>
                  {genreNames.map((g, i) => (
                    <span key={i} className={styles.genreTag}>{g}</span>
                  ))}
                </div>
              </div>

            {/* Show the last updated date for the podcast */}
              <div>
                <h3>LAST UPDATED</h3>
                <p>{new Date(showData.updated).toLocaleDateString('en-US', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}</p>
              </div>

            {/* Display total seasons and total episodes */}
              <div className={styles.metaRow}>
                <div>
                  <h3>TOTAL SEASONS</h3>
                  <p>{showData.seasons.length} Seasons</p>
                </div>
                <div>
                  <h3>TOTAL EPISODES</h3>
                  <p>{totalEpisodes} Episodes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Season selection section */}
        <div className={styles.seasons}>

        {/* Header for the current season */}
          <div className={styles.seasonHeader}>
            <h2>Current Season</h2>

        {/* Dropdown to select which season to view */}
            <select 
              value={selectedSeason}   // show currently selected season
              onChange={(e) => setSelectedSeason(parseInt(e.target.value))} // update selected season
              className={styles.seasonSelect}
            >
        {/* Create an option for each season */}
            {showData.seasons.map((season) => (
            <option key={season.season} value={season.season}>
              Season {season.season}
                </option>
              ))}
            </select>
          </div>

         {/* Show details for the currently selected season */}
          {currentSeason && (
            <>
              <div className={styles.seasonCard}>

             {/* Show details for the currently selected season */}
                <div className={styles.seasonCover}>
                  <img src={currentSeason.image} alt={currentSeason.title} />
                  <span className={styles.seasonLabel}>
                    Season {currentSeason.season} Cover
                    </span>
                </div>

            {/* Season information */}
                <div className={styles.seasonInfo}>
                  <h3>{currentSeason.title}</h3>

            {/* Short description or subtitle for the season */}
                  <p className={styles.seasonSubtitle}>
                    Introduction to the basics and foundational concepts
                    </p>

            {/* Meta info: number of episodes and release year */}        
             <p className={styles.seasonMeta}>
               {currentSeason.episodes.length} Episodes • Released 2024
             </p>
           </div>
        </div>

            {/* List of all episodes for the selected season */}
              <div className={styles.episodes}>
                {currentSeason.episodes.map((ep, index) => (
                  <div key={ep.episode} className={styles.episode}>

            {/* Show the season number */}
                <div className={styles.epNum}>S{currentSeason.season}</div>

            {/* Episode details */}    
                <div className={styles.epContent}>
                <h4>
                  Episode {ep.episode}: {ep.title}
                </h4>

                    {/* Short description (max 150 characters) */}
                      <p className={styles.epDescription}>
                        {ep.description?.substring(0, 150) || 'No description available'}...
                      </p>

                    {/* Episode meta info: duration and release date */}
                      <div className={styles.epMeta}>
                        <span>{formatDuration(ep.duration)}</span>
                        <span>•</span>
                        <span>{formatEpisodeDate(ep.date, index)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}