import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Mock champion data
const mockChampions = [
  { id: "Ahri", name: "Ahri" },
  { id: "Akali", name: "Akali" },
  { id: "Ashe", name: "Ashe" },
  { id: "Darius", name: "Darius" },
  { id: "Ezreal", name: "Ezreal" },
  { id: "Jinx", name: "Jinx" },
  { id: "Lux", name: "Lux" },
  { id: "Yasuo", name: "Yasuo" },
  { id: "Zed", name: "Zed" },
];

interface ChampionPickerProps {
  selectedChampion?: string;
  onSelect: (championId: string) => void;
}

export function ChampionPicker({ selectedChampion, onSelect }: ChampionPickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (championId: string) => {
    onSelect(championId);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-12 h-12 p-0"
      >
        {selectedChampion ? (
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${selectedChampion}.png`}
            alt={selectedChampion}
            className="w-full h-full rounded object-cover"
          />
        ) : (
          "+"
        )}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search champions..." />
        <CommandList>
          <CommandEmpty>No champions found.</CommandEmpty>
          <CommandGroup>
            <div className="grid grid-cols-6 gap-2 p-4">
              {mockChampions.map((champion) => (
                <CommandItem
                  key={champion.id}
                  onSelect={() => handleSelect(champion.id)}
                  className="flex flex-col items-center p-2 h-20 justify-center cursor-pointer hover:bg-accent rounded-md"
                  asChild
                >
                  <div>
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${champion.id}.png`}
                      alt={champion.name}
                      className="w-12 h-12 rounded mb-1"
                    />
                    <span className="text-xs text-center">{champion.name}</span>
                  </div>
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}