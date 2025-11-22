import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import styles from './ShowDetail.module.css';

// useParams = get the id from the URL
// useNavigate = move between pages
// useLocation = get extra data from the previous page
// styles imported from the CSS module for this page