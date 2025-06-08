import { championTags, type ChampionId } from "../types/championTags";

export interface DamageComposition {
  "physical-damage": number;
  "magic-damage": number;
  "true-damage": number;
}

export const getDamageComposition = (
  championIds: ChampionId[],
): DamageComposition => {
  const damageCount = {
    "physical-damage": 0,
    "magic-damage": 0,
    "true-damage": 0,
  };
  let totalSources = 0;

  championIds.forEach((championId) => {
    const tags = championTags[championId];
    if (tags?.damageTypes) {
      tags.damageTypes.forEach((type) => {
        damageCount[type]++;
        totalSources++;
      });
    }
  });

  // Convert to percentages
  const composition: DamageComposition = {
    "physical-damage": 0,
    "magic-damage": 0,
    "true-damage": 0,
  };

  if (totalSources > 0) {
    Object.keys(damageCount).forEach((type) => {
      const key = type as keyof DamageComposition;
      if (damageCount[key] > 0) {
        composition[key] = Math.round((damageCount[key] / totalSources) * 100);
      }
    });
  }

  return composition;
};