import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.jsx'

// This is where the React app starts running.
// We find the <div id="root"> in index.html
// and tell React to show our app inside it.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Load all the routes for the app */}
    <Router />
  </StrictMode>,
)