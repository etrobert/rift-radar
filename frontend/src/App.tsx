import { useState } from "react";
import { useURLState } from "./hooks/useURLState";
import { useLCU } from "./hooks/useLCU";
import { ChampionPicker } from "./components/ChampionPicker";
import { ChampionCard } from "./components/ChampionCard";
import { DamageComposition } from "./components/DamageComposition";
import { Suggestions } from "./components/Suggestions";
import { RoleFilter } from "./components/RoleFilter";
import type { ChampionId, Role } from "./types/championTags";

function App() {
  const [allyPicks, setAllyPicks] = useURLState("allies");
  const [enemyPicks, setEnemyPicks] = useURLState("enemies");
  const [allyBans, setAllyBans] = useURLState("allyBans");
  const [enemyBans, setEnemyBans] = useURLState("enemyBans");
  const [roleFilter, setRoleFilter] = useState<Role | null>(null);

  // LCU integration
  const lcu = useLCU((championSelectState) => {
    setAllyPicks(championSelectState.allyPicks);
    setEnemyPicks(championSelectState.enemyPicks);
    setAllyBans(championSelectState.allyBans);
    setEnemyBans(championSelectState.enemyBans);
  });

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

  const handleSwitchTeams = () => {
    setAllyPicks(enemyPicks);
    setAllyBans(enemyBans);
    setEnemyPicks(allyPicks);
    setEnemyBans(allyBans);
  };

  const handleReset = () => {
    setAllyPicks([]);
    setEnemyPicks([]);
    setAllyBans([]);
    setEnemyBans([]);
  };

  // Get all unavailable champions (picks + bans)
  const unavailableChampions = [
    ...allyPicks,
    ...enemyPicks,
    ...allyBans,
    ...enemyBans,
  ];

  return (
    <>
      <nav className={`border-b p-4 ${lcu.isConnected ? 'border-green-600 bg-green-900/20' : 'border-gray-700 bg-gray-800'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Rift Radar</h1>
            {lcu.isConnected && (
              <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-medium text-white">
                LIVE MODE
              </span>
            )}
          </div>

          {/* LCU Connection Status */}
          <div className="flex items-center gap-4">
            {lcu.isAvailable && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${lcu.isConnected ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span className="text-sm text-gray-300">
                    {lcu.isConnected
                      ? "League Connected"
                      : "League Disconnected"}
                  </span>
                </div>
                {!lcu.isConnected ? (
                  <button
                    onClick={lcu.connect}
                    className="rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                  >
                    Connect
                  </button>
                ) : (
                  <button
                    onClick={lcu.disconnect}
                    className="rounded bg-gray-600 px-3 py-1 text-sm font-medium text-white hover:bg-gray-700"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            )}

            {!lcu.isConnected && (
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
                >
                  Reset
                </button>
                <button
                  onClick={handleSwitchTeams}
                  className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Switch Teams
                </button>
              </div>
            )}
          </div>
        </div>
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
                  onRemove={!lcu.isConnected ? () => handleAllyBanRemove(index) : undefined}
                />
              ))}
              {allyBans.length < 5 && !lcu.isConnected && (
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
                  onRemove={!lcu.isConnected ? () => handleAllyRemove(index) : undefined}
                />
              ))}
              {allyPicks.length < 5 && !lcu.isConnected && (
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
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-gray-200">Pick Suggestions</h3>
              <RoleFilter value={roleFilter} onChange={setRoleFilter} />
            </div>
            <Suggestions
              allyChampions={allyPicks}
              enemyChampions={enemyPicks}
              unavailableChampions={unavailableChampions}
              roleFilter={roleFilter}
            />
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
                  onRemove={!lcu.isConnected ? () => handleEnemyBanRemove(index) : undefined}
                />
              ))}
              {enemyBans.length < 5 && !lcu.isConnected && (
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
                  onRemove={!lcu.isConnected ? () => handleEnemyRemove(index) : undefined}
                />
              ))}
              {enemyPicks.length < 5 && !lcu.isConnected && (
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
