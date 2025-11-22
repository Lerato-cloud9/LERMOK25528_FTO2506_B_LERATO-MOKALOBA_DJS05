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
  const [loading, setLoading] = useState(true);         // For showing a loading screen while fetching data
  const [error, setError] = useState(null);             // Store any error message if something goes wrong
  const [selectedSeason, setSelectedSeason] = useState(1); // Tracks which season the user picked (default is season 1)

useEffect(() => {                         // Function that gets all the data for this show
    const fetchShowData = async () => {   // Start loading and clear any old errors
      setLoading(true);
      setError(null);
      
      try {
        // Fetch preview data (which includes genres and description)
        const previewResponse = await fetch('https://podcast-api.netlify.app/shows');
        if (!previewResponse.ok) throw new Error('Failed to fetch shows');  // Check if the request worked
        const previews = await previewResponse.json();                      // Change the response into usable JSON
        const preview = previews.find(p => p.id === id);                    // Find the preview for the show that matches the id in the URL
        setPreviewData(preview);                                            // Save the preview data

        // Fetch full show data (this includes all seasons and episodes)
        const showResponse = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!showResponse.ok) throw new Error('Failed to fetch show details');  // Check if the request worked
        const fullData = await showResponse.json();                             // Convert the response to JSON
        setShowData(fullData);    // Save the full show data in state
        setSelectedSeason(1);     // Start by showing season 1
      } catch (err) {             // If anything goes wrong, show the error
        setError(err.message);
      } finally {
        setLoading(false);       // Stop the loading screen
      }
    };