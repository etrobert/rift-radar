type DamageType = "physical-damage" | "magic-damage" | "true-damage";

export type Tag =
  | "projectile"
  | "dash"
  | "cc"
  | "healing"
  | "assassin"
  | "strong-ultimate";

type ChampionTags = {
  damageTypes?: DamageType[];
  tags?: Tag[];
  counters?: string[];
  strongAgainst?: Tag[];
  strongAgainstDamageTypes?: DamageType[];
  weakAgainst?: string[];
  synergiesWith?: string[];
};

export type ChampionId = keyof typeof championTags;

export const championTags: Record<string, ChampionTags> = {
  Aatrox: { damageTypes: ["physical-damage"], tags: ["dash", "healing"] },
  Ahri: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "strong-ultimate", "projectile"],
  },
  Akali: { damageTypes: ["magic-damage"], tags: ["dash", "assassin"] },
  Akshan: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "projectile"],
  },
  Alistar: {
    tags: ["dash", "cc", "strong-ultimate"],
    synergiesWith: ["Kalista"],
  },
  Ambessa: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Amumu: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile"],
    synergiesWith: ["MissFortune"],
  },
  Anivia: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Annie: { damageTypes: ["magic-damage"], tags: ["strong-ultimate"] },
  Aphelios: { damageTypes: ["physical-damage"], tags: ["projectile"] },
  Ashe: {
    damageTypes: ["physical-damage"],
    tags: ["strong-ultimate", "projectile"],
  },
  AurelionSol: { damageTypes: ["magic-damage"] },
  Aurora: { damageTypes: ["magic-damage"], tags: ["strong-ultimate"] },
  Azir: { damageTypes: ["magic-damage"], tags: ["dash", "strong-ultimate"] },
  Bard: { tags: ["cc", "projectile"] },
  Belveth: { damageTypes: ["physical-damage"] },
  Blitzcrank: { tags: ["cc", "projectile"] },
  Brand: { damageTypes: ["magic-damage"] },
  Braum: { synergiesWith: ["Lucian"], strongAgainst: ["projectile"] },
  Briar: { damageTypes: ["physical-damage"], tags: ["projectile"] },
  Caitlyn: { damageTypes: ["physical-damage"], tags: ["dash", "projectile"] },
  Camille: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash"],
    synergiesWith: ["Galio"],
  },
  Cassiopeia: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["dash"],
    tags: ["projectile"],
  },
  Chogath: { damageTypes: ["magic-damage"] },
  Corki: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["dash", "projectile"],
  },
  Darius: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["healing"],
  },
  Diana: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "projectile"],
  },
  Draven: { damageTypes: ["physical-damage"], tags: ["projectile"] },
  DrMundo: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate"],
  },
  Ekko: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "assassin"],
  },
  Elise: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Evelynn: { damageTypes: ["magic-damage"], tags: ["assassin"] },
  Ezreal: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile"],
  },
  Fiddlesticks: { damageTypes: ["magic-damage"], tags: ["healing"] },
  Fiora: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash", "healing"],
  },
  Fizz: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "projectile"],
  },
  Galio: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "cc", "strong-ultimate"],
    strongAgainstDamageTypes: ["magic-damage"],
    synergiesWith: ["Camille", "JarvanIV"],
  },
  Gangplank: {
    damageTypes: ["physical-damage", "true-damage"],
    strongAgainst: ["cc"],
    tags: ["projectile"],
  },
  Garen: { damageTypes: ["physical-damage", "true-damage"] },
  Gnar: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Gragas: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile"],
  },
  Graves: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Gwen: { damageTypes: ["magic-damage", "true-damage"], tags: ["dash"] },
  Hecarim: { damageTypes: ["physical-damage"], tags: ["healing"] },
  Heimerdinger: { damageTypes: ["magic-damage"] },
  Hwei: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Illaoi: { damageTypes: ["physical-damage"], tags: ["healing"] },
  Irelia: { damageTypes: ["physical-damage"], tags: ["dash", "healing"] },
  Ivern: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Janna: {
    damageTypes: ["magic-damage"],
    tags: ["healing"],
    strongAgainst: ["assassin"],
  },
  JarvanIV: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    synergiesWith: ["Galio"],
  },
  Jax: { damageTypes: ["physical-damage", "magic-damage"], tags: ["dash"] },
  Jayce: { damageTypes: ["physical-damage"], tags: ["projectile"] },
  Jhin: { damageTypes: ["physical-damage"], tags: ["projectile"] },
  Jinx: { damageTypes: ["physical-damage"], tags: ["projectile"] },
  Kaisa: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile"],
  },
  Kalista: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    synergiesWith: ["Alistar", "Neeko"],
  },
  Karma: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Karthus: { damageTypes: ["magic-damage"] },
  Kassadin: {
    damageTypes: ["magic-damage"],
    tags: ["assassin"],
    strongAgainstDamageTypes: ["magic-damage"],
  },
  Katarina: {
    damageTypes: ["magic-damage"],
    tags: ["assassin"],
    strongAgainst: ["healing"],
    weakAgainst: ["cc"],
  },
  Kayle: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["strong-ultimate"],
    strongAgainst: ["assassin"],
  },
  Kayn: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "assassin"],
  },
  Kennen: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile"],
  },
  Khazix: { damageTypes: ["physical-damage"], tags: ["dash", "assassin"] },
  Kindred: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Kled: { damageTypes: ["physical-damage"], strongAgainst: ["healing"] },
  KogMaw: { damageTypes: ["magic-damage", "physical-damage"] },
  KSante: { damageTypes: ["physical-damage"] },
  Leblanc: { damageTypes: ["magic-damage"], tags: ["dash", "assassin"] },
  LeeSin: { damageTypes: ["physical-damage"], tags: ["dash", "projectile"] },
  Leona: { tags: ["dash", "cc"] },
  Lillia: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["projectile"],
  },
  Lissandra: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "strong-ultimate"],
    strongAgainst: ["assassin"],
  },
  Lucian: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile"],
    synergiesWith: ["Braum"],
  },
  Lulu: { damageTypes: ["magic-damage"], strongAgainst: ["assassin"] },
  Lux: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Malphite: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate"],
    strongAgainstDamageTypes: ["physical-damage"],
    synergiesWith: ["Yasuo", "Yone", "MissFortune", "Orianna"],
  },
  Malzahar: {
    damageTypes: ["magic-damage"],
    tags: ["cc"],
    strongAgainst: ["assassin"],
  },
  Maokai: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "cc", "projectile"],
  },
  MasterYi: {
    damageTypes: ["physical-damage", "true-damage"],
    synergiesWith: ["Zilean"],
    weakAgainst: ["cc"],
  },
  Milio: {
    damageTypes: ["magic-damage"],
    tags: ["healing"],
    strongAgainst: ["cc"],
  },
  MissFortune: {
    damageTypes: ["physical-damage"],
    synergiesWith: ["Amumu", "Malphite"],
    tags: ["projectile"],
  },
  MonkeyKing: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    strongAgainstDamageTypes: ["physical-damage"],
  },
  Mordekaiser: { damageTypes: ["magic-damage"], tags: ["healing"] },
  Morgana: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "projectile"],
    strongAgainst: ["cc"],
  },
  Naafiri: { damageTypes: ["physical-damage"], tags: ["dash", "assassin"] },
  Nami: { damageTypes: ["magic-damage"], tags: ["healing", "projectile"] },
  Nasus: { damageTypes: ["physical-damage"], tags: ["healing"] },
  Nautilus: { tags: ["cc", "projectile"] },
  Neeko: {
    damageTypes: ["magic-damage"],
    synergiesWith: ["Kalista"],
    tags: ["strong-ultimate", "projectile"],
  },
  Nidalee: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile"],
  },
  Nilah: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Nocturne: { damageTypes: ["physical-damage"], synergiesWith: ["Orianna"] },
  Nunu: { damageTypes: ["magic-damage"] },
  Olaf: {
    damageTypes: ["physical-damage", "true-damage"],
    strongAgainst: ["cc"],
    tags: ["healing"],
  },
  Orianna: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate"],
    synergiesWith: ["Nocturne", "Malphite", "Yasuo", "Rakan"],
  },
  Ornn: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Pantheon: { damageTypes: ["physical-damage"] },
  Poppy: { damageTypes: ["physical-damage"], strongAgainst: ["dash"] },
  Pyke: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "projectile"],
  },
  Qiyana: { damageTypes: ["physical-damage"], tags: ["dash", "assassin"] },
  Quinn: { damageTypes: ["physical-damage"] },
  Rakan: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing"],
    synergiesWith: ["Xayah", "Orianna"],
  },
  Rammus: {
    damageTypes: ["magic-damage"],
    strongAgainstDamageTypes: ["physical-damage"],
  },
  RekSai: { damageTypes: ["physical-damage"] },
  Rell: {},
  Renata: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile"],
  },
  Renekton: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Rengar: { damageTypes: ["physical-damage"], tags: ["dash", "assassin"] },
  Riven: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Rumble: { damageTypes: ["magic-damage"] },
  Ryze: { damageTypes: ["magic-damage"] },
  Samira: { damageTypes: ["physical-damage"], tags: ["dash", "healing"] },
  Sejuani: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile"],
  },
  Senna: { damageTypes: ["physical-damage"], tags: ["healing", "projectile"] },
  Seraphine: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "projectile"],
  },
  Sett: { damageTypes: ["physical-damage", "true-damage"] },
  Shaco: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["assassin"],
  },
  Shen: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "cc"],
  },
  Shyvana: { damageTypes: ["magic-damage", "physical-damage"] },
  Singed: { damageTypes: ["magic-damage"], strongAgainst: ["healing"] },
  Sion: { damageTypes: ["physical-damage"], tags: ["cc"] },
  Sivir: { damageTypes: ["physical-damage"], tags: ["projectile"] },
  Skarner: { damageTypes: ["physical-damage"] },
  Smolder: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile"],
  },
  Sona: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "projectile"],
  },
  Soraka: { damageTypes: ["magic-damage"], tags: ["healing"] },
  Swain: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate"],
  },
  Sylas: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile"],
    strongAgainst: ["strong-ultimate"],
  },
  Syndra: { damageTypes: ["magic-damage"], tags: ["cc"] },
  TahmKench: { damageTypes: ["magic-damage"], strongAgainst: ["assassin"] },
  Taliyah: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["dash"],
    tags: ["projectile"],
  },
  Talon: { damageTypes: ["physical-damage"], tags: ["dash", "assassin"] },
  Taric: { damageTypes: ["magic-damage"], tags: ["healing"] },
  Teemo: { damageTypes: ["magic-damage"], tags: ["strong-ultimate"] },
  Thresh: { tags: ["cc", "projectile"] },
  Tristana: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Trundle: { damageTypes: ["physical-damage"], tags: ["healing"] },
  Tryndamere: { damageTypes: ["physical-damage"], tags: ["dash", "healing"] },
  TwistedFate: {
    damageTypes: ["magic-damage"],
    counters: ["Shaco"],
    tags: ["projectile"],
  },
  Twitch: { damageTypes: ["physical-damage"] },
  Udyr: { damageTypes: ["physical-damage"] },
  Urgot: { damageTypes: ["physical-damage"], tags: ["dash", "projectile"] },
  Varus: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["strong-ultimate", "cc", "projectile"],
    strongAgainst: ["healing"],
  },
  Vayne: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash"],
  },
  Veigar: { damageTypes: ["magic-damage"], tags: ["cc", "projectile"] },
  Velkoz: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["projectile"],
  },
  Vex: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Vi: { damageTypes: ["physical-damage"], tags: ["dash"] },
  Viego: { damageTypes: ["physical-damage"], tags: ["dash", "projectile"] },
  Viktor: { damageTypes: ["magic-damage"] },
  Vladimir: { damageTypes: ["magic-damage"], tags: ["healing"] },
  Volibear: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["healing"],
  },
  Warwick: { damageTypes: ["physical-damage"], tags: ["dash", "healing"] },
  Xayah: { damageTypes: ["physical-damage"], synergiesWith: ["Rakan"] },
  Xerath: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  XinZhao: { damageTypes: ["physical-damage"], tags: ["dash", "cc"] },
  Yasuo: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile"],
    synergiesWith: ["Malphite", "Orianna", "Gragas"],
    strongAgainst: ["projectile"],
  },
  Yone: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile"],
  },
  Yorick: { damageTypes: ["physical-damage"] },
  Yuumi: { damageTypes: ["magic-damage"], tags: ["healing"] },
  Zac: { damageTypes: ["magic-damage"], tags: ["dash", "healing"] },
  Zed: { damageTypes: ["physical-damage"], tags: ["dash", "assassin"] },
  Zeri: { damageTypes: ["physical-damage"] },
  Ziggs: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Zilean: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate"],
    strongAgainst: ["assassin"],
    counters: ["Galio"],
    synergiesWith: ["MasterYi"],
  },
  Zoe: { damageTypes: ["magic-damage"], tags: ["projectile"] },
  Zyra: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile"],
  },
  Mel: {
    damageTypes: ["magic-damage"],
    tags: ["projectile"],
    strongAgainst: ["projectile"],
  },
};
