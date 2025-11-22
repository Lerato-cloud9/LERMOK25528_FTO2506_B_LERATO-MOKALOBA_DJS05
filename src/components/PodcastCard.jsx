import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import styles from "./PodcastCard.module.css";

/**
 * Renders a single podcast preview card with image, title, number of seasons,
 * genres (as styled tags), and the last updated date.
 *
 * @param {Object} props
 * @param {Object} props.podcast - The podcast data object to display.
 * @param {string} props.podcast.id - Unique ID of the podcast.
 * @param {string} props.podcast.title - Title of the podcast.
 * @param {string} props.podcast.image - URL of the podcast image.
 * @param {number} props.podcast.seasons - Number of seasons available.
 * @param {string} props.podcast.updated - ISO date string for the last update.
 * @param {Array<Object>} props.genres - Array of genre objects for mapping IDs to titles.
 *
 * @returns {JSX.Element} The rendered podcast card component.
 */
export default function PodcastCard({ podcast, genres }) {
  // useNavigate lets us move to another page when the card is clicked
  const navigate = useNavigate();

  const genreSpans = podcast.genres.map((id) => {
    const match = genres.find((genre) => genre.id === id);
    return (
      <span key={id} className={styles.tag}>
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });

   // When the card is clicked, go to the show's detail page using its ID.
  const handleClick = () => {
    navigate(`/show/${podcast.id}`);
  };

  return (
    // Whole card is clickable so the user can open the show details
    <div className={styles.card} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={podcast.image} alt={podcast.title} />
      <h3>{podcast.title}</h3>
      
      {/* Show how many seasons the podcast has */}
      <p className={styles.seasons}>{podcast.seasons} seasons</p>

      {/* Show all the genres as small tags */}
      <div className={styles.tags}>{genreSpans}</div>

      {/* Show when the podcast was last updated */}
      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </div>
  );
}
