import { useQuery } from "@tanstack/react-query";

export interface StatsResponse {
  totalWins: number;
  totalGames: number;
  championWinrates: Array<{
    ChampionName: string;
    Wins: number;
    Games: number;
  }>;
  enemyWinrates: Array<{
    ChampionName: string;
    Wins: number;
    Games: number;
  }>;
}

interface UsePlayerStatsOptions {
  queueType?: string;
  games?: string;
  enabled?: boolean;
}

export function usePlayerStats(
  gameName: string,
  tagLine: string,
  options: UsePlayerStatsOptions = {},
) {
  const { queueType = "420", games = "1000", enabled = true } = options;

  return useQuery<StatsResponse>({
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
    enabled: enabled && gameName.length > 0 && tagLine.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Helper function to get champion-specific stats
export function getChampionStats(
  stats: StatsResponse | undefined,
  championName: string,
) {
  if (!stats) return null;

  const championData = stats.championWinrates.find(
    (c) => c.ChampionName === championName,
  );

  if (!championData) return null;

  return {
    games: championData.Games,
    wins: championData.Wins,
    losses: championData.Games - championData.Wins,
    winRate:
      championData.Games > 0 ? championData.Wins / championData.Games : 0,
  };
}

