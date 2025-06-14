import type { ChampionId } from "@/types/championTags";
import { championTags } from "@/types/championTags";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import type { StatsResponse } from "../hooks/usePlayerStats";
import { getChampionStats } from "../hooks/usePlayerStats";

interface ChampionIconProps {
  championId: ChampionId;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  title?: string;
  showTooltip?: boolean;
  playerStats?: StatsResponse;
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
  showTooltip = false,
  playerStats,
}: ChampionIconProps) {
  const championData = championTags[championId];
  
  const formatTag = (tag: string) => {
    return tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getDamageTypeColor = (damageType: string) => {
    switch (damageType) {
      case 'physical-damage':
        return 'bg-orange-600 text-orange-100 border-orange-500';
      case 'magic-damage':
        return 'bg-blue-600 text-blue-100 border-blue-500';
      case 'true-damage':
        return 'bg-white text-gray-900 border-gray-300';
      default:
        return 'bg-gray-700 text-gray-200 border-gray-600';
    }
  };

  const championImage = (
    <img
      src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${championId}.png`}
      alt={championId}
      title={!showTooltip ? (title || championId) : undefined}
      className={cn(
        sizeClasses[size],
        "rounded border border-gray-500 object-cover",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    />
  );

  if (!showTooltip || !championData) {
    return championImage;
  }

  // Get player stats for this champion
  const playerChampionStats = playerStats ? getChampionStats(playerStats, championId) : null;

  const tooltipContent = (
    <div className="space-y-2">
      <div className="font-semibold text-white">{championId}</div>
      
      {/* Player Performance Stats */}
      {playerChampionStats && (
        <div>
          <div className="text-xs text-gray-400 mb-1">Your Performance:</div>
          <div className={`text-sm ${playerChampionStats.winRate < 0.5 ? "text-red-400" : "text-green-400"}`}>
            {playerChampionStats.wins}-{playerChampionStats.losses} ({(playerChampionStats.winRate * 100).toFixed(0)}% WR) 
            <span className="text-gray-300"> in {playerChampionStats.games} games</span>
          </div>
        </div>
      )}
      
      {championData.roles && championData.roles.length > 0 && (
        <div>
          <div className="text-xs text-gray-400 mb-1">Roles:</div>
          <div className="flex flex-wrap gap-1">
            {championData.roles.map((role) => (
              <span
                key={role}
                className="inline-block px-2 py-0.5 text-xs bg-gray-700 text-gray-200 rounded-full border border-gray-600"
              >
                {formatTag(role)}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {championData.damageTypes && championData.damageTypes.length > 0 && (
        <div>
          <div className="text-xs text-gray-400 mb-1">Damage:</div>
          <div className="flex flex-wrap gap-1">
            {championData.damageTypes.map((damageType) => (
              <span
                key={damageType}
                className={`inline-block px-2 py-0.5 text-xs rounded-full border ${getDamageTypeColor(damageType)}`}
              >
                {formatTag(damageType)}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {championData.tags && championData.tags.length > 0 && (
        <div>
          <div className="text-xs text-gray-400 mb-1">Tags:</div>
          <div className="flex flex-wrap gap-1">
            {championData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 text-xs bg-gray-700 text-gray-200 rounded-full border border-gray-600"
              >
                {formatTag(tag)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {championImage}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
