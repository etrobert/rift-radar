import type { ChampionId } from "../types/championTags";

interface SuggestionsProps {
  allyChampions: ChampionId[];
  enemyChampions: ChampionId[];
}

export function Suggestions({
  allyChampions,
  enemyChampions,
}: SuggestionsProps) {
  return (
    <div className="text-center text-gray-400">
      <p>Suggestions will be implemented here</p>
      <p className="mt-2 text-xs">
        Enemy champions: {enemyChampions.length} | Ally champions:{" "}
        {allyChampions.length}
      </p>
    </div>
  );
}

