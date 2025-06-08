import { championTags, type ChampionId, type Tag } from "../types/championTags";
import { ChampionIcon } from "./ChampionIcon";
import { getDamageComposition } from "../lib/damageComposition";

interface SuggestionsProps {
  allyChampions: ChampionId[];
  enemyChampions: ChampionId[];
  unavailableChampions: ChampionId[];
}

interface Suggestion {
  reason: string;
  champions: ChampionId[];
  triggeringEnemies?: ChampionId[];
  triggeringAllies?: ChampionId[];
}

const generateCounterSuggestion = (
  enemyChampions: ChampionId[],
  targetTag: Tag,
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
  { tag: "healing", minCount: 2, reason: "Strong against healing" },
  { tag: "strong-ultimate", minCount: 2, reason: "Good ultimates to steal" },
  { tag: "projectile", minCount: 2, reason: "Strong against projectiles" },
] as const;

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

const generateSynergySuggestions = (
  allyChampions: ChampionId[],
): Suggestion[] =>
  allyChampions
    .map((ally) => {
      const champion = championTags[ally];
      if (!champion.synergiesWith) return null;
      return {
        reason: `Synergy with ${ally}`,
        champions: champion.synergiesWith,
        triggeringAllies: [ally],
      } satisfies Suggestion;
    })
    .filter((s) => s !== null);

const generateSpecificCounterSuggestions = (
  enemyChampions: ChampionId[],
): Suggestion[] =>
  Object.entries(championTags)
    .map(([championName, tags]) => {
      if (!tags.counters) return null;
      const counteredEnemies = enemyChampions.filter((enemy) =>
        tags.counters!.includes(enemy),
      );
      if (counteredEnemies.length === 0) return null;
      return {
        reason: `Counters specific enemies`,
        champions: [championName],
        triggeringEnemies: counteredEnemies,
      } satisfies Suggestion;
    })
    .filter((s) => s !== null);

const generateStrongWithSuggestion = (
  allyChampions: ChampionId[],
  targetTag: Tag,
  reason: string,
): Suggestion | null => {
  const alliesWithTag = allyChampions.filter((id) =>
    championTags[id]?.tags?.includes(targetTag),
  );

  if (alliesWithTag.length === 0) return null;

  // Find champions that are strong with this tag
  const strongWithChampions = Object.keys(championTags).filter((champName) =>
    championTags[champName]?.strongWith?.includes(targetTag),
  );

  if (strongWithChampions.length === 0) return null;

  return {
    reason,
    champions: strongWithChampions,
    triggeringAllies: alliesWithTag,
  };
};

const strongWithRules = [
  { tag: "wall", reason: "Strong with wall champions" },
] as const;

const generateStrongWithSuggestions = (
  allyChampions: ChampionId[],
): Suggestion[] => {
  return strongWithRules
    .map(({ tag, reason }) =>
      generateStrongWithSuggestion(allyChampions, tag, reason),
    )
    .filter((s) => s !== null);
};

const generateDamageCounterSuggestions = (
  enemyChampions: ChampionId[],
): Suggestion[] => {
  if (enemyChampions.length < 3) return [];

  const composition = getDamageComposition(enemyChampions);

  return (
    [
      { type: "physical-damage", reason: "Strong against physical damage" },
      { type: "magic-damage", reason: "Strong against magic damage" },
    ] as const
  )
    .map(({ type, reason }) => {
      if (composition[type] < 60) return null;

      const enemiesWithDamageType = enemyChampions.filter((enemy) =>
        championTags[enemy]?.damageTypes?.includes(type),
      );

      const counters = Object.keys(championTags).filter((championName) =>
        championTags[championName]?.strongAgainstDamageTypes?.includes(type),
      );
      if (counters.length === 0) return null;

      return {
        reason,
        champions: counters,
        triggeringEnemies: enemiesWithDamageType,
      } satisfies Suggestion;
    })
    .filter((s) => s !== null);
};

export function Suggestions({
  allyChampions,
  enemyChampions,
  unavailableChampions,
}: SuggestionsProps) {
  const tagCounterSuggestions = generateTagCounterSuggestions(enemyChampions);
  const synergySuggestions = generateSynergySuggestions(allyChampions);
  const specificCounterSuggestions =
    generateSpecificCounterSuggestions(enemyChampions);
  const strongWithSuggestions = generateStrongWithSuggestions(allyChampions);
  const damageCounterSuggestions =
    generateDamageCounterSuggestions(enemyChampions);
  const suggestions = [
    ...synergySuggestions,
    ...strongWithSuggestions,
    ...specificCounterSuggestions,
    ...damageCounterSuggestions,
    ...tagCounterSuggestions,
  ];

  if (enemyChampions.length === 0 && allyChampions.length === 0) {
    return (
      <div className="text-center text-gray-400">
        <p>Select champions to see suggestions</p>
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
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {[
                { champions: suggestion.triggeringEnemies, label: "Counters:" },
                { champions: suggestion.triggeringAllies, label: "Sinergies:" },
              ].map(
                ({ champions, label }) =>
                  champions && (
                    <div key={label} className="flex items-center gap-1">
                      <span>{label}</span>
                      {champions.map((championId) => (
                        <ChampionIcon
                          key={championId}
                          championId={championId}
                          size="sm"
                        />
                      ))}
                    </div>
                  ),
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {suggestion.champions.map((championName) => (
              <ChampionIcon
                key={championName}
                size="lg"
                championId={championName}
                className={
                  unavailableChampions.includes(championName)
                    ? "opacity-40"
                    : ""
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
