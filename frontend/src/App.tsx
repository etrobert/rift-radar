import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { DraftPage } from "./components/DraftPage";
import { StatsPage } from "./components/StatsPage";

interface NavigationProps {
  onReset?: () => void;
  onSwitchTeams?: () => void;
  showButtons?: boolean;
  // LCU props
  lcuIsAvailable?: boolean;
  lcuIsConnected?: boolean;
  onLcuConnect?: () => void;
  onLcuDisconnect?: () => void;
}

export function Navigation({ 
  onReset, 
  onSwitchTeams, 
  showButtons, 
  lcuIsAvailable, 
  lcuIsConnected, 
  onLcuConnect, 
  onLcuDisconnect 
}: NavigationProps) {
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
        
        <div className="flex items-center gap-4">
          {/* Live Mode Indicator */}
          {lcuIsConnected && (
            <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-medium text-white">
              LIVE MODE
            </span>
          )}
          
          {/* LCU Connection Status */}
          {lcuIsAvailable && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${lcuIsConnected ? "bg-green-500" : "bg-red-500"}`}
                />
                <span className="text-sm text-gray-300">
                  {lcuIsConnected ? "League Connected" : "League Disconnected"}
                </span>
              </div>
              {!lcuIsConnected ? (
                <button
                  onClick={onLcuConnect}
                  className="rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                >
                  Connect
                </button>
              ) : (
                <button
                  onClick={onLcuDisconnect}
                  className="rounded bg-gray-600 px-3 py-1 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Disconnect
                </button>
              )}
            </div>
          )}

          {/* Draft Control Buttons */}
          {showButtons && (
            <div className="flex gap-2">
              <button
                onClick={onReset}
                className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
              >
                Reset
              </button>
              <button
                onClick={onSwitchTeams}
                className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
              >
                Switch Teams
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<DraftPage />} />
          <Route path="/stats" element={<><Navigation /><StatsPage /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
