import { useState, useEffect, useCallback } from "react";
import type { ChampionId } from "../types/championTags";

/**
 * Custom hook to sync an array of champions with URL query parameters
 * @param key - The URL parameter key (e.g., 'allies', 'enemies')
 * @returns [value, setValue] tuple similar to useState
 */
export function useURLState(key: string) {
  const getURLState = useCallback(
    // TODO: Add validation
    () =>
      new URLSearchParams(window.location.search).getAll(key) as ChampionId[],
    [key],
  );

  // Initialize state from URL on first render
  const [value, setValue] = useState<ChampionId[]>(getURLState);

  useEffect(() => {
    const handlePopState = () => setValue(getURLState);

    // Listen for browser back/forward
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [getURLState, key]);

  // Write to URL when state changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Remove all existing values for this key
    params.delete(key);

    // Add each value separately for proper array handling
    value.forEach((champion) => params.append(key, champion));

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    // Use replaceState to avoid cluttering browser history
    window.history.replaceState(null, "", newUrl);
  }, [key, value]);

  return [value, setValue] as const;
}
