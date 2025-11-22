# DJS05: Show Detail Page with Routing and Navigation

🎙️ Podcast App - Show Detail Pages

🎯 What I Built
I added show detail pages to my podcast app. Now when you click a podcast, it takes you to a new page showing all its seasons, episodes, and information. Each show has its own unique URL!

✨ Features
🧭 Navigation

Click any podcast → Opens detail page
Back button → Returns home with filters saved

📺 Show Detail Page

Large podcast image
Full description
Genre tags (Technology, Business, etc.)
Last updated date (January 15, 2025)
Total seasons and episodes count

🎬 Season Browser

Dropdown to switch between seasons
Season card with cover image and episode count
Episode list showing:

Episode number badge (S1, S2)
Episode title
Short description (150 chars)
Duration and date



⏳ Loading & Errors

Spinner while fetching data
Clear error messages
"Back to Homepage" button
Never stuck on blank page

🛠️ Tech Used

⚛️ React
🛣️ React Router v6
🎨 CSS Modules
🌐 Fetch API
⚡ Vite

🚀 How to Run
Terminal run-npm install
npm run dev
# Open http://localhost:5173

📚 What I Learned

✅ Setting up React Router
✅ Using useParams() to get ID from URL
✅ Using useNavigate() to change pages
✅ Using useLocation() to pass state
✅ Dynamic routing with parameters
✅ State persistence across navigation
✅ Fetching from multiple API endpoints
✅ Handling loading and error states

🐛 Problems Solved

Genres not showing → Fetched preview data separately
State lost on back → Used location.state
Missing episode data → Added fallback values
Page blank → Fixed missing loading state

Made with ❤️ while learning React Router!