import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ShowDetail from "./pages/ShowDetail";

/**
 * This file sets up the routes for the app.
 * 
 * - BrowserRouter: lets the app use links and URLs.
 * - Routes: a container that holds all the Route paths.
 * - Route: each path shows a specific component on the screen.
 * 
 * "/" → shows the App (home page)
 * "/show/:id" → shows details for one show using its id
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App />} />

        {/* Show detail page (uses id from the URL) */}
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </BrowserRouter>
  );
}