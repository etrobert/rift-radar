import { championTags, type ChampionId } from "../types/championTags";

interface SuggestionsProps {
  allyChampions: ChampionId[];
  enemyChampions: ChampionId[];
}

interface Suggestion {
  reason: string;
  champions: ChampionId[];
  triggeringEnemies: ChampionId[];
}

const generateCounterSuggestion = (
  enemyChampions: ChampionId[],
  targetTag: string,
  minCount: number,
  reason: string,
): Suggestion | null => {
  const enemiesWithTag = enemyChampions.filter((id) =>
    championTags[id]?.tags?.includes(targetTag),
  );

  if (enemiesWithTag.length < minCount) return null;

  // Find champions that counter this tag
  const counters = Object.keys(championTags).filter((champName) =>
    championTags[champName]?.strongAgainst?.includes(targetTag),
  );

  if (counters.length === 0) return null;

  return {
    reason,
    champions: counters,
    triggeringEnemies: enemiesWithTag,
  };
};

// Define counter rules for tags only
const counterRules = [
  { tag: "dash", minCount: 2, reason: "Strong against dashes" },
  { tag: "assassin", minCount: 2, reason: "Strong against assassins" },
];

const generateTagCounterSuggestions = (
  enemyChampions: ChampionId[],
): Suggestion[] => {
  // Generate suggestions for each rule
  const suggestions = counterRules
    .map(({ tag, minCount, reason }) =>
      generateCounterSuggestion(enemyChampions, tag, minCount, reason),
    )
    .filter((s) => s !== null);

  return suggestions;
};
export function Suggestions({
  allyChampions,
  enemyChampions,
}: SuggestionsProps) {
  const suggestions = generateTagCounterSuggestions(enemyChampions);

  if (enemyChampions.length === 0) {
    return (
      <div className="text-center text-gray-400">
        <p>Select enemy champions to see counter-pick suggestions</p>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="text-center text-gray-400">
        <p>No specific counter suggestions available</p>
        <p className="mt-2 text-xs">
          Enemy champions: {enemyChampions.length} | Ally champions:{" "}
          {allyChampions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="space-y-2">
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-200">
              {suggestion.reason}
            </h4>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>Counters:</span>
              {suggestion.triggeringEnemies.map((enemyId) => (
                <img
                  key={enemyId}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${enemyId}.png`}
                  alt={enemyId}
                  className="h-4 w-4 rounded"
                  title={enemyId}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {suggestion.champions.map((championName) => (
              <div key={championName} className="relative">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${championName}.png`}
                  alt={championName}
                  className="aspect-square w-full cursor-pointer rounded border border-gray-600 object-cover transition-colors hover:border-blue-400"
                  title={championName}
                />
                <div className="bg-opacity-75 absolute right-0 bottom-0 left-0 rounded-b bg-black py-0.5 text-center text-xs text-white">
                  <span className="text-xs leading-none">{championName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
