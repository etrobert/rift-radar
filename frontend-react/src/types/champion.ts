export interface Champion {
  id: string;
  name: string;
  key: string;
  title: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  stats: Record<string, number>;
  partype: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  tags: string[];
  blurb: string;
}

export interface ChampionData {
  type: string;
  format: string;
  version: string;
  data: Record<string, Champion>;
}