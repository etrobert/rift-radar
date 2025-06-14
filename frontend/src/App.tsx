import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { DraftPage } from "./components/DraftPage";
import { StatsPage } from "./components/StatsPage";

function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-gray-700 bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-white">Rift Radar</h1>
          <div className="flex gap-4">
            <Link
              to="/"
              className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/") 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Draft Analysis
            </Link>
            <Link
              to="/stats"
              className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/stats") 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Player Stats
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<DraftPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
