import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { ChampionIcon } from "./ChampionIcon";

interface StatsResponse {
  totalWins: number;
  totalGames: number;
  championWinrates: Array<{
    championId: number;
    championName: string;
    wins: number;
    losses: number;
    games: number;
    winrate: number;
  }>;
  enemyWinrates: Array<{
    championId: number;
    championName: string;
    wins: number;
    losses: number;
    games: number;
    winrate: number;
  }>;
}

const queueTypes = [
  { value: "", label: "All Queues" },
  { value: "420", label: "Ranked Solo/Duo" },
  { value: "440", label: "Ranked Flex" },
  { value: "400", label: "Normal Draft" },
  { value: "430", label: "Normal Blind" },
];

const gameAmounts = [
  { value: "20", label: "20 Games" },
  { value: "50", label: "50 Games" },
  { value: "100", label: "100 Games" },
  { value: "200", label: "200 Games" },
];

export function StatsPage() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [queueType, setQueueType] = useState("420");
  const [games, setGames] = useState("100");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery<StatsResponse>({
    queryKey: ["playerStats", gameName, tagLine, queueType, games],
    queryFn: async () => {
      const params = new URLSearchParams({
        gameName,
        tagLine,
        games,
        ...(queueType && { queueType }),
      });

      const response = await fetch(`http://localhost:8080/api/stats?${params}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    },
    enabled: searchSubmitted && gameName.length > 0 && tagLine.length > 0,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameName.trim() && tagLine.trim()) {
      setSearchSubmitted(true);
      refetch();
    }
  };

  const formatWinrate = (winrate: number) => `${(winrate * 100).toFixed(1)}%`;

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold text-white">Player Statistics</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 rounded-lg border border-gray-600 bg-gray-800 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Game Name
            </label>
            <input
              type="text"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Enter game name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Tag Line
            </label>
            <input
              type="text"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="NA1, EUW, etc."
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Queue Type
            </label>
            <select
              value={queueType}
              onChange={(e) => setQueueType(e.target.value)}
              className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              {queueTypes.map((queue) => (
                <option key={queue.value} value={queue.value}>
                  {queue.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Games
            </label>
            <select
              value={games}
              onChange={(e) => setGames(e.target.value)}
              className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              {gameAmounts.map((amount) => (
                <option key={amount.value} value={amount.value}>
                  {amount.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700">
          Search Player Stats
        </Button>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-gray-300">
          <div className="mb-4">Loading player statistics...</div>
          <div className="h-2 w-full bg-gray-700 rounded overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded border border-red-600 bg-red-900/20 p-4 text-red-400">
          Error loading stats: {error.message}
        </div>
      )}

      {/* Results */}
      {stats && (
        <div className="space-y-8">
          {/* Overall Stats */}
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Overall Performance</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.totalWins}</div>
                <div className="text-sm text-gray-400">Wins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.totalGames - stats.totalWins}</div>
                <div className="text-sm text-gray-400">Losses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {formatWinrate(stats.totalWins / stats.totalGames)}
                </div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
            </div>
          </div>

          {/* Champion Performance */}
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Champion Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="pb-2 text-left text-gray-300">Champion</th>
                    <th className="pb-2 text-center text-gray-300">Games</th>
                    <th className="pb-2 text-center text-gray-300">Wins</th>
                    <th className="pb-2 text-center text-gray-300">Losses</th>
                    <th className="pb-2 text-center text-gray-300">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.championWinrates
                    .sort((a, b) => b.games - a.games)
                    .map((champion) => (
                      <tr key={champion.championId} className="border-b border-gray-700">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <ChampionIcon championId={champion.championName as any} size="sm" />
                            <span className="text-white">{champion.championName}</span>
                          </div>
                        </td>
                        <td className="py-3 text-center text-gray-300">{champion.games}</td>
                        <td className="py-3 text-center text-green-400">{champion.wins}</td>
                        <td className="py-3 text-center text-red-400">{champion.losses}</td>
                        <td className="py-3 text-center">
                          <span
                            className={
                              champion.winrate >= 0.6
                                ? "text-green-400"
                                : champion.winrate >= 0.5
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }
                          >
                            {formatWinrate(champion.winrate)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enemy Performance */}
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Performance vs Enemy Champions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="pb-2 text-left text-gray-300">Enemy Champion</th>
                    <th className="pb-2 text-center text-gray-300">Games</th>
                    <th className="pb-2 text-center text-gray-300">Wins</th>
                    <th className="pb-2 text-center text-gray-300">Losses</th>
                    <th className="pb-2 text-center text-gray-300">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.enemyWinrates
                    .sort((a, b) => b.games - a.games)
                    .map((enemy) => (
                      <tr key={enemy.championId} className="border-b border-gray-700">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <ChampionIcon championId={enemy.championName as any} size="sm" />
                            <span className="text-white">{enemy.championName}</span>
                          </div>
                        </td>
                        <td className="py-3 text-center text-gray-300">{enemy.games}</td>
                        <td className="py-3 text-center text-green-400">{enemy.wins}</td>
                        <td className="py-3 text-center text-red-400">{enemy.losses}</td>
                        <td className="py-3 text-center">
                          <span
                            className={
                              enemy.winrate >= 0.6
                                ? "text-green-400"
                                : enemy.winrate >= 0.5
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }
                          >
                            {formatWinrate(enemy.winrate)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}