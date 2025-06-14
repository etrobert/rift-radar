import {
  championTags,
  type ChampionId,
  type Tag,
  type Role,
} from "../types/championTags";
import { ChampionIcon } from "./ChampionIcon";
import { getDamageComposition } from "../lib/damageComposition";
import { cn } from "../lib/utils";

interface SuggestionsProps {
  allyChampions: ChampionId[];
  enemyChampions: ChampionId[];
  unavailableChampions: ChampionId[];
  roleFilter: Role | null;
}

interface Suggestion {
  reason: string;
  champions: ChampionId[];
  triggeringEnemies?: ChampionId[];
  triggeringAllies?: ChampionId[];
}

// Helper function to filter champions by role
const filterChampionsByRole = (champions: string[], role: Role): string[] =>
  champions.filter((champion) => championTags[champion].roles.includes(role));

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
  { tag: "shield", minCount: 2, reason: "Strong against shields" },
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

  // Find champions that are explicitly strong with this tag
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

// Tags that auto-suggest champions with the same tag
const autoSynergyTags = [
  { tag: "pick-potential", reason: "Strong with pick champions" },
  { tag: "wombo-combo", reason: "Strong with wombo combo champions" },
] as const;

const generateAutoSynergySuggestions = (allyChampions: ChampionId[]) =>
  autoSynergyTags
    .map(({ tag, reason }) => {
      const alliesWithTag = allyChampions.filter((id) =>
        championTags[id]?.tags?.includes(tag),
      );

      if (alliesWithTag.length === 0) return null;

      // Find all champions with the same tag
      const sameTagChampions = Object.keys(championTags).filter((champName) =>
        championTags[champName]?.tags?.includes(tag),
      );

      if (sameTagChampions.length === 0) return null;

      return {
        reason,
        champions: sameTagChampions,
        triggeringAllies: alliesWithTag,
      };
    })
    .filter((s) => s !== null);

const strongWithRules = [
  { tag: "wall", reason: "Strong with wall champions" },
  { tag: "poison", reason: "Strong with poison champions" },
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
  roleFilter,
}: SuggestionsProps) {
  const tagCounterSuggestions = generateTagCounterSuggestions(enemyChampions);
  const synergySuggestions = generateSynergySuggestions(allyChampions);
  const specificCounterSuggestions =
    generateSpecificCounterSuggestions(enemyChampions);
  const strongWithSuggestions = generateStrongWithSuggestions(allyChampions);
  const autoSynergySuggestions = generateAutoSynergySuggestions(allyChampions);
  const damageCounterSuggestions =
    generateDamageCounterSuggestions(enemyChampions);
  let suggestions: Suggestion[] = [
    ...synergySuggestions,
    ...strongWithSuggestions,
    ...autoSynergySuggestions,
    ...specificCounterSuggestions,
    ...damageCounterSuggestions,
    ...tagCounterSuggestions,
  ];

  // Apply role filtering if a role is selected
  if (roleFilter) {
    suggestions = suggestions
      .map((suggestion) => ({
        ...suggestion,
        champions: filterChampionsByRole(suggestion.champions, roleFilter),
      }))
      .filter((suggestion) => suggestion.champions.length > 0);
  }

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
                          showTooltip={true}
                        />
                      ))}
                    </div>
                  ),
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {suggestion.champions.map((championName) => {
              const isPickedByAllies = allyChampions.includes(championName);
              const isUnavailable = unavailableChampions.includes(championName);

              return (
                <div key={championName} className="relative">
                  <ChampionIcon
                    size="lg"
                    championId={championName}
                    showTooltip={true}
                    className={cn(
                      isPickedByAllies && "[filter:sepia(1)_hue-rotate(90deg)]",
                      !isPickedByAllies && isUnavailable && "opacity-40",
                    )}
                  />
                  {isPickedByAllies && (
                    <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-green-300 drop-shadow-lg">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
