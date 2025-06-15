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
import type { ChampionId } from "@/types/championTags";
import { ChampionIcon } from "./ChampionIcon";
import { useChampions } from "../hooks/useChampions";

interface ChampionPickerProps {
  onSelect: (championId: ChampionId) => void;
  unavailableChampions: ChampionId[];
}

export function ChampionPicker({
  onSelect,
  unavailableChampions,
}: ChampionPickerProps) {
  const [open, setOpen] = useState(false);

  const { data: champions = [], isLoading } = useChampions();

  const handleSelect = (championId: string) => {
    onSelect(championId);
    setOpen(false);
  };

  const filter = (value: string, search: string) =>
    value.toLowerCase().startsWith(search.toLowerCase()) ? 1 : 0;

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-12 w-12 p-0"
      >
        +
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} filter={filter}>
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
                  {champions
                    .filter(
                      (champion) => !unavailableChampions.includes(champion.id),
                    )
                    .map((champion) => (
                      <CommandItem
                        key={champion.id}
                        onSelect={() => handleSelect(champion.id)}
                        className="hover:bg-accent flex h-20 cursor-pointer flex-col items-center justify-center rounded-md p-2"
                        asChild
                      >
                        <div>
                          <ChampionIcon
                            championId={champion.id}
                            className="mb-1"
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
