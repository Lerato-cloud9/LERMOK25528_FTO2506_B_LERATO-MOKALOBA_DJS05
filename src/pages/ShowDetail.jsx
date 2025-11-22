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