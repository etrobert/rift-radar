import { useState, useEffect, useCallback } from "react";
import type { ChampionId } from "../types/championTags";
import { useChampions } from "./useChampions";
import type { LcuComponents } from "hexgate";

// Use official LCU API types from hexgate
type ChampionSelectSession =
  LcuComponents["schemas"]["LolChampSelectChampSelectSession"];

// Declare electron API types
declare global {
  interface Window {
    electronAPI?: {
      lcuConnect: () => Promise<{
        success: boolean;
        message?: string;
        error?: string;
      }>;
      lcuDisconnect: () => Promise<{ success: boolean; message?: string }>;
      lcuGetCurrentSession: () => Promise<{
        success: boolean;
        data?: ChampionSelectSession;
        error?: string;
      }>;
      onChampionSelectUpdate: (
        callback: (data: ChampionSelectSession | null) => void,
      ) => void;
      removeChampionSelectListener: () => void;
    };
  }
}

interface LCUHookReturn {
  isConnected: boolean;
  isAvailable: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

interface ChampionSelectState {
  allyPicks: ChampionId[];
  enemyPicks: ChampionId[];
  allyBans: ChampionId[];
  enemyBans: ChampionId[];
}

export function useLCU(
  onChampionSelectUpdate?: (state: ChampionSelectState) => void,
): LCUHookReturn {
  const [isConnected, setIsConnected] = useState(false);
  const isAvailable = !!window.electronAPI;

  // Fetch champion data to build the mapping
  const { data: champions = [] } = useChampions();

  // Build mapping from numeric key to champion id
  const championKeyToId = champions.reduce<Record<number, ChampionId>>(
    (acc, champion) => {
      // TODO: Fix as
      acc[parseInt(champion.key)] = champion.id as ChampionId;
      return acc;
    },
    {},
  );

  const connect = useCallback(async () => {
    if (!window.electronAPI) return;

    const result = await window.electronAPI.lcuConnect();
    setIsConnected(result.success);
  }, []);

  const disconnect = useCallback(async () => {
    if (!window.electronAPI) return;

    await window.electronAPI.lcuDisconnect();
    setIsConnected(false);
  }, []);

  // Process champion select data from LCU
  const processChampionSelectData = useCallback(
    (data: ChampionSelectSession | null) => {
      if (!data?.myTeam || !data?.theirTeam || !onChampionSelectUpdate) return;

      try {
        // Extract picks and bans
        const allyPicks: ChampionId[] = [];
        const allyBans: ChampionId[] = [];
        const enemyPicks: ChampionId[] = [];
        const enemyBans: ChampionId[] = [];

        // Process ally team
        data.myTeam.forEach((player) => {
          if (player.championId && player.championId > 0) {
            const championName = championKeyToId[player.championId];
            if (championName) allyPicks.push(championName);
          }
        });

        // Process enemy team
        data.theirTeam.forEach((player) => {
          if (player.championId && player.championId > 0) {
            const championName = championKeyToId[player.championId];
            if (championName) enemyPicks.push(championName);
          }
        });

        // Process bans using the correct structure
        if (data.bans) {
          // Process ally bans
          data.bans.myTeamBans?.forEach((championId) => {
            if (championId && championId > 0) {
              const championName = championKeyToId[championId];
              if (championName) {
                allyBans.push(championName);
              }
            }
          });

          // Process enemy bans
          data.bans.theirTeamBans?.forEach((championId) => {
            if (championId && championId > 0) {
              const championName = championKeyToId[championId];
              if (championName) {
                enemyBans.push(championName);
              }
            }
          });
        }

        // Update state with live data
        onChampionSelectUpdate({
          allyPicks,
          enemyPicks,
          allyBans,
          enemyBans,
        });
      } catch (error) {
        console.error("Error processing champion select data:", error);
      }
    },
    [onChampionSelectUpdate, championKeyToId],
  );

  // Set up LCU real-time updates
  useEffect(() => {
    if (!window.electronAPI || !onChampionSelectUpdate) return;

    window.electronAPI.onChampionSelectUpdate(processChampionSelectData);

    return () => window.electronAPI?.removeChampionSelectListener();
  }, [processChampionSelectData, onChampionSelectUpdate]);

  return {
    isConnected,
    isAvailable,
    connect,
    disconnect,
  };
}
