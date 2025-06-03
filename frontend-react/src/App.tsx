import { useState } from "react";
import { ChampionPicker } from "./components/ChampionPicker";

function App() {
  const [allyPicks, setAllyPicks] = useState<(string | undefined)[]>([undefined]);
  const [enemyPicks, setEnemyPicks] = useState<(string | undefined)[]>([undefined]);

  const handleAllySelect = (index: number, championId: string) => {
    const newPicks = [...allyPicks];
    newPicks[index] = championId;
    // Add new slot if this was the last one and we have less than 5
    if (index === newPicks.length - 1 && newPicks.length < 5) {
      newPicks.push(undefined);
    }
    setAllyPicks(newPicks);
  };

  const handleEnemySelect = (index: number, championId: string) => {
    const newPicks = [...enemyPicks];
    newPicks[index] = championId;
    // Add new slot if this was the last one and we have less than 5
    if (index === newPicks.length - 1 && newPicks.length < 5) {
      newPicks.push(undefined);
    }
    setEnemyPicks(newPicks);
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
              {allyPicks.map((champion, index) => (
                <ChampionPicker
                  key={index}
                  selectedChampion={champion}
                  onSelect={(championId) => handleAllySelect(index, championId)}
                />
              ))}
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
              {enemyPicks.map((champion, index) => (
                <ChampionPicker
                  key={index}
                  selectedChampion={champion}
                  onSelect={(championId) => handleEnemySelect(index, championId)}
                />
              ))}
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
