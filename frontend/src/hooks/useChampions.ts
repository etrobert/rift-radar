import { useQuery } from "@tanstack/react-query";
import type { Champion } from "../types/champion";
import { ChampionDataSchema } from "../types/champion";

const fetchChampions = async (): Promise<Champion[]> => {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/15.11.1/data/en_US/champion.json",
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch champions: ${response.status}`);
  }

  const rawData = await response.json();
  const data = ChampionDataSchema.parse(rawData);

  return Object.values(data.data).sort((a, b) => a.name.localeCompare(b.name));
};

export function useChampions() {
  return useQuery({
    queryKey: ["champions"],
    queryFn: fetchChampions,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}