import { useState } from "react";
import { ChampionPicker } from "./components/ChampionPicker";
import { ChampionCard } from "./components/ChampionCard";
import { DamageComposition } from "./components/DamageComposition";
import { Suggestions } from "./components/Suggestions";
import type { ChampionId } from "./types/championTags";

function App() {
  const [allyPicks, setAllyPicks] = useState<ChampionId[]>([]);
  const [enemyPicks, setEnemyPicks] = useState<ChampionId[]>([]);
  const [allyBans, setAllyBans] = useState<ChampionId[]>([]);
  const [enemyBans, setEnemyBans] = useState<ChampionId[]>([]);

  const handleAllySelect = (championId: ChampionId) => {
    setAllyPicks((allyPicks) => [...allyPicks, championId]);
  };

  const handleAllyRemove = (index: number) => {
    setAllyPicks((allyPicks) => allyPicks.filter((_, i) => i !== index));
  };

  const handleEnemySelect = (championId: ChampionId) => {
    setEnemyPicks((enemyPicks) => [...enemyPicks, championId]);
  };

  const handleEnemyRemove = (index: number) => {
    setEnemyPicks((enemyPicks) => enemyPicks.filter((_, i) => i !== index));
  };

  const handleAllyBanSelect = (championId: ChampionId) => {
    setAllyBans((allyBans) => [...allyBans, championId]);
  };

  const handleAllyBanRemove = (index: number) => {
    setAllyBans((allyBans) => allyBans.filter((_, i) => i !== index));
  };

  const handleEnemyBanSelect = (championId: ChampionId) => {
    setEnemyBans((enemyBans) => [...enemyBans, championId]);
  };

  const handleEnemyBanRemove = (index: number) => {
    setEnemyBans((enemyBans) => enemyBans.filter((_, i) => i !== index));
  };

  // Get all unavailable champions (picks + bans)
  const unavailableChampions = [...allyPicks, ...enemyPicks, ...allyBans, ...enemyBans];

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
              {allyBans.map((champion, index) => (
                <ChampionCard
                  key={index}
                  championId={champion}
                  onRemove={() => handleAllyBanRemove(index)}
                />
              ))}
              {allyBans.length < 5 && (
                <ChampionPicker
                  onSelect={handleAllyBanSelect}
                  unavailableChampions={unavailableChampions}
                />
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Ally Team</h3>
            <div className="flex flex-nowrap gap-2">
              {allyPicks.map((champion, index) => (
                <ChampionCard
                  key={index}
                  championId={champion}
                  onRemove={() => handleAllyRemove(index)}
                />
              ))}
              {allyPicks.length < 5 && (
                <ChampionPicker
                  onSelect={handleAllySelect}
                  unavailableChampions={unavailableChampions}
                />
              )}
            </div>
            <div className="mt-4">
              <DamageComposition champions={allyPicks} />
            </div>
          </div>
        </div>

        {/* Center Suggestions */}
        <div className="flex-1">
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Pick Suggestions</h3>
            <Suggestions allyChampions={allyPicks} enemyChampions={enemyPicks} />
          </div>
        </div>

        {/* Right Team */}
        <div className="min-w-80">
          <div className="mb-5 rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Enemy Bans</h3>
            <div className="flex flex-nowrap gap-2">
              {enemyBans.map((champion, index) => (
                <ChampionCard
                  key={index}
                  championId={champion}
                  onRemove={() => handleEnemyBanRemove(index)}
                />
              ))}
              {enemyBans.length < 5 && (
                <ChampionPicker
                  onSelect={handleEnemyBanSelect}
                  unavailableChampions={unavailableChampions}
                />
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
            <h3 className="mb-4 text-center text-gray-200">Enemy Team</h3>
            <div className="flex flex-nowrap gap-2">
              {enemyPicks.map((champion, index) => (
                <ChampionCard
                  key={index}
                  championId={champion}
                  onRemove={() => handleEnemyRemove(index)}
                />
              ))}
              {enemyPicks.length < 5 && (
                <ChampionPicker
                  onSelect={handleEnemySelect}
                  unavailableChampions={unavailableChampions}
                />
              )}
            </div>
            <div className="mt-4">
              <DamageComposition champions={enemyPicks} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
