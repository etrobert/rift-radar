import { useState } from "react";
import { useURLState } from "../hooks/useURLState";
import { useLCU } from "../hooks/useLCU";
import { usePlayerStats } from "../hooks/usePlayerStats";
import { Navigation } from "../App";
import { ChampionPicker } from "./ChampionPicker";
import { ChampionCard } from "./ChampionCard";
import { DamageComposition } from "./DamageComposition";
import { Suggestions } from "./Suggestions";
import { RoleFilter } from "./RoleFilter";
import type { ChampionId, Role } from "../types/championTags";

export function DraftPage() {
  const [allyPicks, setAllyPicks] = useURLState("allies");
  const [enemyPicks, setEnemyPicks] = useURLState("enemies");
  const [allyBans, setAllyBans] = useURLState("allyBans");
  const [enemyBans, setEnemyBans] = useURLState("enemyBans");
  const [roleFilter, setRoleFilter] = useState<Role | null>(null);
  
  // Player stats context
  const [playerInfo, setPlayerInfo] = useState<{ gameName: string; tagLine: string } | null>(null);
  
  // Fetch player stats when player info is available
  const playerStatsQuery = usePlayerStats(
    playerInfo?.gameName || "",
    playerInfo?.tagLine || "",
    { enabled: !!playerInfo }
  );

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
      <Navigation 
        onReset={handleReset}
        onSwitchTeams={handleSwitchTeams}
        showButtons={!lcu.isConnected}
        lcuIsAvailable={lcu.isAvailable}
        lcuIsConnected={lcu.isConnected}
        onLcuConnect={lcu.connect}
        onLcuDisconnect={lcu.disconnect}
        playerInfo={playerInfo}
        onPlayerChange={setPlayerInfo}
        showPlayerInput={true}
        playerStatsStatus={playerStatsQuery.status}
      />

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
              playerStats={playerStatsQuery.data}
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