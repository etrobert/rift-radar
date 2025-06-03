import type { ChampionId } from "@/types/championTags";
import { cn } from "@/lib/utils";

interface ChampionIconProps {
  championId: ChampionId;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  title?: string;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-12 w-12",
  lg: "h-18 w-18",
};

export function ChampionIcon({
  championId,
  size = "md",
  className,
  onClick,
  title,
}: ChampionIconProps) {
  return (
    <img
      src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${championId}.png`}
      alt={championId}
      title={title || championId}
      className={cn(
        sizeClasses[size],
        "rounded border border-gray-500 object-cover",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    />
  );
}
