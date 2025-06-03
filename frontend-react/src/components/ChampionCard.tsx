import type { ChampionId } from "../types/championTags";
import { ChampionIcon } from "./ChampionIcon";
import { Button } from "@/components/ui/button";

interface ChampionCardProps {
  championId: ChampionId;
  onRemove: () => void;
}

export function ChampionCard({ championId, onRemove }: ChampionCardProps) {
  return (
    <Button
      onClick={onRemove}
      variant="outline"
      size="icon"
      className="group relative h-12 w-12 p-0 hover:border-red-500"
      title={`Remove ${championId}`}
    >
      <ChampionIcon championId={championId} />

      {/* Overlay X that appears on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-red-500/70 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-2xl font-bold text-white">×</span>
      </div>
    </Button>
  );
}
