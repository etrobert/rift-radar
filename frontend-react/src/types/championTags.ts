type DamageType = "physical-damage" | "magic-damage" | "true-damage";

export type Role = "top" | "jungle" | "mid" | "adc" | "support";

export type Tag =
  | "projectile"
  | "dash"
  | "cc"
  | "healing"
  | "assassin"
  | "strong-ultimate"
  | "wall"
  | "poison"
  | "shield"
  | "pick-potential"
  | "wombo-combo";

type ChampionTags = {
  damageTypes?: DamageType[];
  tags?: Tag[];
  counters?: string[];
  strongAgainst?: Tag[];
  strongAgainstDamageTypes?: DamageType[];
  strongWith?: Tag[];
  weakAgainst?: string[];
  synergiesWith?: string[];
  roles: Role[];
};

export type ChampionId = keyof typeof championTags;

export const championTags: Record<string, ChampionTags> = {
  Aatrox: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing"],
    roles: ["top"],
  },
  Ahri: {
    damageTypes: ["magic-damage"],
    tags: [
      "dash",
      "assassin",
      "strong-ultimate",
      "projectile",
      "pick-potential",
    ],
    roles: ["mid"],
  },
  Akali: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin"],
    roles: ["mid", "top"],
  },
  Akshan: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "projectile"],
    roles: ["mid", "top"],
  },
  Alistar: {
    tags: ["dash", "cc", "strong-ultimate", "wombo-combo"],
    synergiesWith: ["Kalista"],
    roles: ["support"],
  },
  Ambessa: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    roles: ["top", "jungle", "mid"],
  },
  Amumu: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile", "wombo-combo"],
    synergiesWith: ["MissFortune"],
    roles: ["jungle", "support"],
  },
  Anivia: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "wall"],
    roles: ["mid", "support", "top"],
  },
  Annie: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "wombo-combo"],
    roles: ["mid", "support"],
  },
  Aphelios: {
    damageTypes: ["physical-damage"],
    tags: ["projectile"],
    roles: ["adc"],
  },
  Ashe: {
    damageTypes: ["physical-damage"],
    tags: ["strong-ultimate", "projectile", "pick-potential"],
    roles: ["adc", "support"],
  },
  AurelionSol: { damageTypes: ["magic-damage"], roles: ["mid", "adc"] },
  Aurora: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate"],
    roles: ["mid", "top"],
  },
  Azir: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "wall"],
    roles: ["mid"],
  },
  Bard: {
    tags: ["cc", "projectile", "wombo-combo"],
    strongWith: ["wall"],
    roles: ["support"],
  },
  Belveth: { damageTypes: ["physical-damage"], roles: ["jungle"] },
  Blitzcrank: {
    tags: ["cc", "projectile", "pick-potential"],
    strongAgainst: ["shield"],
    roles: ["support"],
  },
  Brand: {
    damageTypes: ["magic-damage"],
    tags: ["wombo-combo"],
    roles: ["support", "mid"],
  },
  Braum: {
    synergiesWith: ["Lucian"],
    strongAgainst: ["projectile"],
    roles: ["support"],
  },
  Briar: {
    damageTypes: ["physical-damage"],
    tags: ["projectile"],
    roles: ["jungle"],
  },
  Caitlyn: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile"],
    roles: ["adc"],
  },
  Camille: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash"],
    synergiesWith: ["Galio"],
    roles: ["top", "support"],
  },
  Cassiopeia: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["dash"],
    tags: ["projectile", "poison"],
    strongWith: ["poison"],
    roles: ["top", "mid", "adc"],
  },
  Chogath: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate"],
    roles: ["top", "mid", "jungle", "support"],
  },
  Corki: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["dash", "projectile"],
    roles: ["mid", "adc"],
  },
  Darius: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["healing"],
    roles: ["top"],
  },
  Diana: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "projectile"],
    roles: ["mid", "jungle"],
  },
  Draven: {
    damageTypes: ["physical-damage"],
    tags: ["projectile"],
    roles: ["adc"],
  },
  DrMundo: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate"],
    roles: ["top", "jungle"],
  },
  Ekko: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "assassin"],
    roles: ["mid", "jungle"],
  },
  Elise: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "pick-potential", "assassin"],
    roles: ["jungle", "support"],
  },
  Evelynn: {
    damageTypes: ["magic-damage"],
    tags: ["assassin"],
    roles: ["jungle"],
  },
  Ezreal: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile"],
    roles: ["adc"],
  },
  Fiddlesticks: {
    damageTypes: ["magic-damage"],
    tags: ["healing"],
    roles: ["jungle", "support"],
  },
  Fiora: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash", "healing"],
    roles: ["top"],
  },
  Fizz: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "projectile"],
    roles: ["mid"],
  },
  Galio: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "cc", "strong-ultimate"],
    strongAgainstDamageTypes: ["magic-damage"],
    synergiesWith: ["Camille", "JarvanIV"],
    roles: ["top", "mid", "support"],
  },
  Gangplank: {
    damageTypes: ["physical-damage", "true-damage"],
    strongAgainst: ["cc"],
    tags: ["projectile"],
    roles: ["top", "mid"],
  },
  Garen: {
    damageTypes: ["physical-damage", "true-damage"],
    roles: ["top", "mid"],
  },
  Gnar: { damageTypes: ["physical-damage"], tags: ["dash"], roles: ["top"] },
  Gragas: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile"],
    roles: ["jungle", "top", "mid", "support"],
  },
  Graves: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    roles: ["jungle"],
  },
  Gwen: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["dash"],
    roles: ["top", "jungle"],
  },
  Hecarim: {
    damageTypes: ["physical-damage"],
    tags: ["healing"],
    roles: ["jungle"],
  },
  Heimerdinger: {
    damageTypes: ["magic-damage"],
    roles: ["mid", "top", "adc", "support"],
  },
  Hwei: {
    damageTypes: ["magic-damage"],
    tags: ["projectile"],
    roles: ["mid", "adc", "support"],
  },
  Illaoi: {
    damageTypes: ["physical-damage"],
    tags: ["healing"],
    roles: ["top", "mid"],
  },
  Irelia: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing"],
    roles: ["top", "mid"],
  },
  Ivern: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "shield"],
    roles: ["jungle", "support"],
  },
  Janna: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "shield"],
    strongAgainst: ["assassin"],
    roles: ["support"],
  },
  JarvanIV: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "wall"],
    synergiesWith: ["Galio"],
    roles: ["jungle", "top", "support"],
  },
  Jax: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["dash"],
    roles: ["top", "jungle"],
  },
  Jayce: {
    damageTypes: ["physical-damage"],
    tags: ["projectile"],
    roles: ["top", "mid"],
  },
  Jhin: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "pick-potential"],
    roles: ["adc"],
  },
  Jinx: {
    damageTypes: ["physical-damage"],
    tags: ["projectile"],
    roles: ["adc"],
  },
  Kaisa: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile"],
    roles: ["adc"],
  },
  Kalista: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    synergiesWith: ["Alistar", "Neeko"],
    roles: ["top", "adc"],
  },
  Karma: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "shield"],
    roles: ["support", "mid"],
  },
  Karthus: { damageTypes: ["magic-damage"], roles: ["jungle", "mid", "adc"] },
  Kassadin: {
    damageTypes: ["magic-damage"],
    tags: ["assassin"],
    strongAgainstDamageTypes: ["magic-damage"],
    roles: ["mid"],
  },
  Katarina: {
    damageTypes: ["magic-damage"],
    tags: ["assassin"],
    strongAgainst: ["healing"],
    weakAgainst: ["cc"],
    roles: ["mid"],
  },
  Kayle: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["strong-ultimate"],
    strongAgainst: ["assassin"],
    roles: ["top", "mid"],
  },
  Kayn: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "assassin"],
    roles: ["top", "jungle"],
  },
  Kennen: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile", "wombo-combo"],
    roles: ["top", "mid"],
  },
  Khazix: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential"],
    roles: ["jungle"],
  },
  Kindred: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    roles: ["jungle"],
  },
  Kled: {
    damageTypes: ["physical-damage"],
    strongAgainst: ["healing"],
    roles: ["top", "mid"],
  },
  KogMaw: {
    damageTypes: ["magic-damage", "physical-damage"],
    roles: ["adc", "mid"],
  },
  KSante: { damageTypes: ["physical-damage"], roles: ["top"] },
  Leblanc: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin"],
    roles: ["mid", "support"],
  },
  LeeSin: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile"],
    roles: ["jungle"],
  },
  Leona: {
    tags: ["dash", "cc", "pick-potential"],
    roles: ["support"],
  },
  Lillia: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["projectile"],
    roles: ["jungle", "top"],
  },
  Lissandra: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "strong-ultimate"],
    strongAgainst: ["assassin"],
    roles: ["mid", "top"],
  },
  Lucian: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile"],
    synergiesWith: ["Braum"],
    roles: ["adc", "mid"],
  },
  Lulu: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["assassin"],
    roles: ["support"],
  },
  Lux: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "shield"],
    roles: ["support", "adc", "mid"],
  },
  Malphite: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "wombo-combo"],
    strongAgainstDamageTypes: ["physical-damage"],
    synergiesWith: ["Yasuo", "Yone", "MissFortune", "Orianna"],
    roles: ["top", "mid", "jungle", "support"],
  },
  Malzahar: {
    damageTypes: ["magic-damage"],
    tags: ["cc"],
    strongAgainst: ["assassin"],
    roles: ["top", "mid"],
  },
  Maokai: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "cc", "projectile"],
    roles: ["top", "jungle", "support"],
  },
  MasterYi: {
    damageTypes: ["physical-damage", "true-damage"],
    synergiesWith: ["Zilean"],
    weakAgainst: ["cc"],
    roles: ["top", "jungle"],
  },
  Milio: {
    damageTypes: ["magic-damage"],
    tags: ["healing"],
    strongAgainst: ["cc"],
    roles: ["support"],
  },
  MissFortune: {
    damageTypes: ["physical-damage"],
    synergiesWith: ["Amumu", "Malphite"],
    tags: ["projectile", "wombo-combo"],
    roles: ["adc"],
  },
  MonkeyKing: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "wombo-combo"],
    strongAgainstDamageTypes: ["physical-damage"],
    roles: ["top", "jungle"],
  },
  Mordekaiser: {
    damageTypes: ["magic-damage"],
    tags: ["healing"],
    roles: ["top", "jungle", "mid"],
  },
  Morgana: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "projectile", "pick-potential"],
    strongAgainst: ["cc"],
    roles: ["support", "jungle", "mid"],
  },
  Naafiri: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin"],
    roles: ["jungle", "mid"],
  },
  Nami: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "projectile"],
    roles: ["support"],
  },
  Nasus: {
    damageTypes: ["physical-damage"],
    tags: ["healing"],
    roles: ["jungle", "mid", "top"],
  },
  Nautilus: {
    tags: ["cc", "projectile", "pick-potential"],
    roles: ["support"],
  },
  Neeko: {
    damageTypes: ["magic-damage"],
    synergiesWith: ["Kalista"],
    tags: ["strong-ultimate", "projectile", "wombo-combo"],
    roles: ["mid", "support"],
  },
  Nidalee: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile", "pick-potential"],
    roles: ["top", "jungle", "support"],
  },
  Nilah: { damageTypes: ["physical-damage"], tags: ["dash"], roles: ["adc"] },
  Nocturne: {
    damageTypes: ["physical-damage"],
    synergiesWith: ["Orianna"],
    tags: ["assassin"],
    roles: ["jungle"],
  },
  Nunu: { damageTypes: ["magic-damage"], roles: ["jungle", "mid", "support"] },
  Olaf: {
    damageTypes: ["physical-damage", "true-damage"],
    strongAgainst: ["cc"],
    tags: ["healing"],
    roles: ["jungle", "top"],
  },
  Orianna: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "shield", "wombo-combo"],
    synergiesWith: ["Nocturne", "Malphite", "Yasuo", "Rakan", "Rengar"],
    roles: ["mid"],
  },
  Ornn: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "wall"],
    roles: ["top"],
  },
  Pantheon: {
    damageTypes: ["physical-damage"],
    roles: ["jungle", "mid", "top", "support"],
  },
  Poppy: {
    damageTypes: ["physical-damage"],
    strongAgainst: ["dash"],
    strongWith: ["wall"],
    roles: ["top", "jungle", "support"],
  },
  Pyke: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "projectile", "pick-potential"],
    roles: ["support"],
  },
  Qiyana: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin"],
    strongWith: ["wall"],
    roles: ["mid", "jungle"],
  },
  Quinn: { damageTypes: ["physical-damage"], roles: ["top", "mid"] },
  Rakan: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "strong-ultimate"],
    synergiesWith: ["Xayah", "Orianna"],
    roles: ["support"],
  },
  Rammus: {
    damageTypes: ["magic-damage"],
    strongAgainstDamageTypes: ["physical-damage"],
    roles: ["jungle", "top"],
  },
  RekSai: { damageTypes: ["physical-damage"], roles: ["jungle", "top"] },
  Rell: { tags: ["shield"], roles: ["support"] },
  Renata: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile"],
    roles: ["support"],
  },
  Renekton: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    strongAgainst: ["shield"],
    roles: ["top", "mid"],
  },
  Rengar: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential"],
    synergiesWith: ["Orianna"],
    roles: ["jungle", "top"],
  },
  Riven: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "shield"],
    roles: ["top", "mid"],
  },
  Rumble: {
    damageTypes: ["magic-damage"],
    strongWith: ["wall"],
    roles: ["top", "mid", "jungle"],
  },
  Ryze: { damageTypes: ["magic-damage"], roles: ["mid", "top"] },
  Samira: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing"],
    roles: ["adc"],
  },
  Sejuani: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile", "pick-potential"],
    roles: ["jungle", "top"],
  },
  Senna: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "projectile"],
    roles: ["support", "adc"],
  },
  Seraphine: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "projectile", "shield"],
    roles: ["support", "mid"],
  },
  Sett: {
    damageTypes: ["physical-damage", "true-damage"],
    roles: ["top", "mid", "support"],
  },
  Shaco: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["assassin"],
    roles: ["jungle", "support"],
  },
  Shen: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "cc", "shield"],
    roles: ["top", "jungle", "mid", "support"],
  },
  Shyvana: {
    damageTypes: ["magic-damage", "physical-damage"],
    roles: ["top", "jungle"],
  },
  Singed: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["healing"],
    tags: ["poison"],
    roles: ["top", "mid"],
  },
  Sion: {
    damageTypes: ["physical-damage"],
    tags: ["cc"],
    roles: ["top", "jungle", "mid", "support"],
  },
  Sivir: {
    damageTypes: ["physical-damage"],
    tags: ["projectile"],
    roles: ["adc"],
  },
  Skarner: { damageTypes: ["physical-damage"], roles: ["top", "jungle"] },
  Smolder: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile"],
    roles: ["top", "mid", "adc"],
  },
  Sona: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "projectile", "shield"],
    roles: ["support"],
  },
  Soraka: {
    damageTypes: ["magic-damage"],
    tags: ["healing"],
    roles: ["support"],
  },
  Swain: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate"],
    roles: ["support", "mid", "adc", "top"],
  },
  Sylas: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile"],
    strongAgainst: ["strong-ultimate"],
    roles: ["mid", "jungle", "top", "support"],
  },
  Syndra: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "pick-potential"],
    roles: ["mid"],
  },
  TahmKench: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["assassin"],
    tags: ["shield"],
    roles: ["support", "top"],
  },
  Taliyah: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["dash"],
    tags: ["projectile", "wall"],
    roles: ["jungle", "mid", "support"],
  },
  Talon: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential"],
    roles: ["mid", "jungle"],
  },
  Taric: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "shield"],
    roles: ["support"],
  },
  Teemo: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "poison"],
    roles: ["top", "jungle", "mid", "support"],
  },
  Thresh: {
    tags: ["cc", "projectile", "shield", "pick-potential"],
    roles: ["support"],
  },
  Tristana: {
    damageTypes: ["physical-damage"],
    tags: ["dash"],
    roles: ["adc", "mid"],
  },
  Trundle: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "wall"],
    roles: ["top", "jungle", "support"],
  },
  Tryndamere: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing"],
    roles: ["top", "jungle", "mid"],
  },
  TwistedFate: {
    damageTypes: ["magic-damage"],
    counters: ["Shaco"],
    tags: ["projectile", "pick-potential"],
    roles: ["top", "mid"],
  },
  Twitch: {
    damageTypes: ["physical-damage"],
    tags: ["poison"],
    roles: ["adc", "mid", "jungle"],
  },
  Udyr: {
    damageTypes: ["physical-damage"],
    tags: ["shield"],
    roles: ["jungle", "top"],
  },
  Urgot: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile"],
    roles: ["top"],
  },
  Varus: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["strong-ultimate", "cc", "projectile"],
    strongAgainst: ["healing"],
    roles: ["adc", "mid", "top"],
  },
  Vayne: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash"],
    strongWith: ["wall"],
    roles: ["adc", "top", "mid"],
  },
  Veigar: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "projectile"],
    roles: ["mid", "adc", "support", "top"],
  },
  Velkoz: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["projectile"],
    roles: ["support", "mid", "adc"],
  },
  Vex: { damageTypes: ["magic-damage"], tags: ["projectile"], roles: ["mid"] },
  Vi: { damageTypes: ["physical-damage"], tags: ["dash"], roles: ["jungle"] },
  Viego: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "assassin"],
    roles: ["jungle"],
  },
  Viktor: {
    damageTypes: ["magic-damage"],
    tags: ["shield"],
    roles: ["mid", "top", "adc"],
  },
  Vladimir: {
    damageTypes: ["magic-damage"],
    tags: ["healing"],
    roles: ["mid", "top"],
  },
  Volibear: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["healing", "shield"],
    roles: ["jungle", "top"],
  },
  Warwick: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing"],
    roles: ["jungle", "top"],
  },
  Xayah: {
    damageTypes: ["physical-damage"],
    synergiesWith: ["Rakan"],
    roles: ["adc"],
  },
  Xerath: {
    damageTypes: ["magic-damage"],
    tags: ["projectile"],
    roles: ["mid", "support"],
  },
  XinZhao: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "cc"],
    roles: ["jungle", "top"],
  },
  Yasuo: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "wombo-combo"],
    synergiesWith: ["Malphite", "Orianna", "Gragas"],
    strongAgainst: ["projectile"],
    roles: ["mid", "adc", "top"],
  },
  Yone: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile", "shield"],
    roles: ["mid", "top"],
  },
  Yorick: { damageTypes: ["physical-damage"], roles: ["top", "jungle"] },
  Yuumi: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "shield"],
    roles: ["support"],
  },
  Zac: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing"],
    roles: ["jungle", "top", "support"],
  },
  Zed: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential"],
    roles: ["mid", "jungle"],
  },
  Zeri: { damageTypes: ["physical-damage"], roles: ["adc"] },
  Ziggs: {
    damageTypes: ["magic-damage"],
    tags: ["projectile"],
    roles: ["mid", "adc", "support"],
  },
  Zilean: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate"],
    strongAgainst: ["assassin"],
    counters: ["Galio"],
    synergiesWith: ["MasterYi"],
    roles: ["support", "mid", "top"],
  },
  Zoe: {
    damageTypes: ["magic-damage"],
    tags: ["projectile"],
    roles: ["mid", "support"],
  },
  Zyra: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile"],
    roles: ["support", "mid", "jungle"],
  },
  Mel: {
    damageTypes: ["magic-damage"],
    tags: ["projectile"],
    strongAgainst: ["projectile"],
    roles: ["support", "mid", "adc"],
  },
};
