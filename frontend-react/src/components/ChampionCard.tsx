interface ChampionCardProps {
  championId: string;
  onRemove: () => void;
}

export function ChampionCard({ championId, onRemove }: ChampionCardProps) {
  return (
    <button
      onClick={onRemove}
      className="group relative h-12 w-12 overflow-hidden rounded border-2 border-gray-600 bg-gray-700 hover:border-red-500 transition-colors duration-200"
      title={`Remove ${championId}`}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${championId}.png`}
        alt={championId}
        className="h-full w-full object-cover"
      />
      
      {/* Overlay X that appears on hover */}
      <div className="absolute inset-0 bg-red-500/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">×</span>
      </div>
    </button>
  );
}

