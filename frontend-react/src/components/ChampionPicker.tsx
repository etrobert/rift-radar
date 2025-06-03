import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { Champion } from "../types/champion";
import { ChampionDataSchema } from "../types/champion";

interface ChampionPickerProps {
  onSelect: (championId: string) => void;
}

const fetchChampions = async (): Promise<Champion[]> => {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/15.11.1/data/en_US/champion.json",
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch champions: ${response.status}`);
  }

  const rawData = await response.json();
  const data = ChampionDataSchema.parse(rawData);

  return Object.values(data.data).sort((a, b) => a.name.localeCompare(b.name));
};

export function ChampionPicker({ onSelect }: ChampionPickerProps) {
  const [open, setOpen] = useState(false);

  const { data: champions = [], isLoading } = useQuery({
    queryKey: ["champions"],
    queryFn: fetchChampions,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const handleSelect = (championId: string) => {
    onSelect(championId);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-12 w-12 p-0"
      >
        +
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search champions..." />
        <CommandList>
          {isLoading ? (
            <div className="text-muted-foreground p-8 text-center">
              Loading champions...
            </div>
          ) : (
            <>
              <CommandEmpty>No champions found.</CommandEmpty>
              <CommandGroup>
                <div className="grid grid-cols-6 gap-2 p-4">
                  {champions.map((champion) => (
                    <CommandItem
                      key={champion.id}
                      onSelect={() => handleSelect(champion.id)}
                      className="hover:bg-accent flex h-20 cursor-pointer flex-col items-center justify-center rounded-md p-2"
                      asChild
                    >
                      <div>
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${champion.id}.png`}
                          alt={champion.name}
                          className="mb-1 h-12 w-12 rounded"
                        />
                        <span className="text-center text-xs">
                          {champion.name}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
