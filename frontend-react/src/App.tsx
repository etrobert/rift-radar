import { useState } from "react";
import { ChampionPicker } from "./components/ChampionPicker";

function App() {
  const [allyPicks, setAllyPicks] = useState<string[]>([]);
  const [enemyPicks, setEnemyPicks] = useState<string[]>([]);

  const handleAllySelect = (championId: string) => {
    setAllyPicks((allyPicks) => [...allyPicks, championId]);
  };

  const handleEnemySelect = (championId: string) => {
    setEnemyPicks((enemyPicks) => [...enemyPicks, championId]);
  };

  return (
    <>
      <nav className="border-b border-gray-700 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">Rift Radar</h1>
      </nav>

      <div className="flex gap-5 p-5">
        {/* Left Team */}
        <div className="min-w-80">
          <div className="mb-5 rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Ally Bans</h3>
            <div className="flex flex-nowrap gap-2">
              {/* Ban selectors will go here */}
            </div>
          </div>
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Ally Team</h3>
            <div className="flex flex-nowrap gap-2">
              {allyPicks.map((champion) => champion)}
              {allyPicks.length < 5 && (
                <ChampionPicker onSelect={handleAllySelect} />
              )}
            </div>
            <div className="mt-4">
              <div className="h-6 rounded bg-gray-700">
                {/* Damage composition bar */}
              </div>
            </div>
          </div>
        </div>

        {/* Center Suggestions */}
        <div className="flex-1">
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Pick Suggestions</h3>
            <div className="text-center text-gray-400">
              <p>Select enemy champions to see counter-pick suggestions</p>
            </div>
          </div>
        </div>

        {/* Right Team */}
        <div className="min-w-80">
          <div className="mb-5 rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Enemy Bans</h3>
            <div className="flex flex-nowrap gap-2">
              {/* Ban selectors will go here */}
            </div>
          </div>
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Enemy Team</h3>
            <div className="flex flex-nowrap gap-2">
              {enemyPicks.map((champion) => champion)}

              {enemyPicks.length < 5 && (
                <ChampionPicker onSelect={handleEnemySelect} />
              )}
            </div>
            <div className="mt-4">
              <div className="h-6 rounded bg-gray-700">
                {/* Damage composition bar */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
