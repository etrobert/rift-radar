import { championTags, type ChampionId } from "../types/championTags";
import { ChampionIcon } from "./ChampionIcon";

interface SuggestionsProps {
  allyChampions: ChampionId[];
  enemyChampions: ChampionId[];
  unavailableChampions: ChampionId[];
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
  unavailableChampions,
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
                <ChampionIcon key={enemyId} championId={enemyId} size="sm" />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {suggestion.champions.map((championName) => (
              <ChampionIcon
                key={championName}
                size="lg"
                championId={championName}
                className={unavailableChampions.includes(championName) ? "opacity-40" : ""}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
