import { type ChampionId } from "../types/championTags";
import { getDamageComposition } from "../lib/damageComposition";

interface DamageCompositionProps {
  champions: ChampionId[];
}

export function DamageComposition({ champions }: DamageCompositionProps) {

  const composition = getDamageComposition(champions);
  const hasAnyDamage = Object.values(composition).some((value) => value > 0);

  if (!hasAnyDamage) {
    return <div className="h-6 rounded bg-gray-700" />;
  }

  return (
    <div className="flex h-6 overflow-hidden rounded">
      {composition["physical-damage"] > 0 && (
        <div
          className="flex items-center justify-center bg-orange-500 text-xs font-medium text-white"
          style={{ width: `${composition["physical-damage"]}%` }}
          title={`Physical ${composition["physical-damage"]}%`}
        >
          {composition["physical-damage"] > 15 &&
            `${composition["physical-damage"]}%`}
        </div>
      )}
      {composition["magic-damage"] > 0 && (
        <div
          className="flex items-center justify-center bg-blue-500 text-xs font-medium text-white"
          style={{ width: `${composition["magic-damage"]}%` }}
          title={`Magic ${composition["magic-damage"]}%`}
        >
          {composition["magic-damage"] > 15 &&
            `${composition["magic-damage"]}%`}
        </div>
      )}
      {composition["true-damage"] > 0 && (
        <div
          className="flex items-center justify-center bg-gray-200 text-xs font-medium text-gray-800"
          style={{ width: `${composition["true-damage"]}%` }}
          title={`True ${composition["true-damage"]}%`}
        >
          {composition["true-damage"] > 15 && `${composition["true-damage"]}%`}
        </div>
      )}
    </div>
  );
}
