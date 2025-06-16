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
  | "wombo-combo"
  | "auto-attack";

type ChampionTags = {
  damageTypes?: readonly DamageType[];
  tags?: readonly Tag[];
  counters?: readonly ChampionId[];
  strongAgainst?: readonly Tag[];
  strongAgainstDamageTypes?: readonly DamageType[];
  strongWith?: readonly Tag[];
  weakAgainst?: readonly Tag[];
  synergiesWith?: readonly ChampionId[];
  roles: readonly Role[];
};

const internalChampionTags = {
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
    tags: ["dash", "assassin", "projectile", "auto-attack"],
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
    tags: ["projectile", "auto-attack"],
    roles: ["adc"],
  },
  Ashe: {
    damageTypes: ["physical-damage"],
    tags: ["strong-ultimate", "projectile", "pick-potential", "auto-attack"],
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
    tags: ["dash", "strong-ultimate", "wall", "auto-attack"],
    roles: ["mid"],
  },
  Bard: {
    tags: ["cc", "projectile", "wombo-combo", "auto-attack"],
    strongWith: ["wall"],
    roles: ["support"],
  },
  Belveth: {
    tags: ["dash", "auto-attack"],
    damageTypes: ["physical-damage"],
    roles: ["jungle"],
  },
  Blitzcrank: {
    tags: ["cc", "projectile", "pick-potential", "auto-attack"],
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
    strongAgainst: ["projectile", "auto-attack"],
    roles: ["support"],
  },
  Briar: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["jungle"],
  },
  Caitlyn: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "auto-attack"],
    roles: ["adc"],
  },
  Camille: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash", "auto-attack"],
    synergiesWith: ["Galio"],
    roles: ["top", "support"],
    strongWith: ["wall"],
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
    tags: ["dash", "projectile", "auto-attack"],
    roles: ["mid", "adc"],
  },
  Darius: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["healing", "auto-attack"],
    roles: ["top"],
  },
  Diana: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "projectile", "auto-attack"],
    roles: ["mid", "jungle"],
  },
  Draven: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["adc"],
  },
  DrMundo: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "auto-attack"],
    roles: ["top", "jungle"],
  },
  Ekko: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "assassin", "auto-attack"],
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
    tags: ["projectile", "auto-attack"],
    roles: ["adc"],
  },
  Fiddlesticks: {
    damageTypes: ["magic-damage"],
    tags: ["healing"],
    roles: ["jungle", "support"],
  },
  Fiora: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash", "healing", "auto-attack"],
    roles: ["top"],
  },
  Fizz: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "projectile", "auto-attack"],
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
    tags: ["projectile", "auto-attack"],
    roles: ["top", "mid"],
  },
  Garen: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["auto-attack"],
    roles: ["top", "mid"],
  },
  Gnar: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["top"],
  },
  Gragas: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile"],
    roles: ["jungle", "top", "mid", "support"],
  },
  Graves: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["jungle"],
  },
  Gwen: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["top", "jungle"],
  },
  Hecarim: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "auto-attack"],
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
    tags: ["healing", "auto-attack"],
    roles: ["top", "mid"],
  },
  Irelia: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "auto-attack"],
    roles: ["top", "mid"],
  },
  Ivern: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "shield"],
    roles: ["jungle", "support"],
    synergiesWith: ["Rengar"],
  },
  Janna: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "shield"],
    strongAgainst: ["assassin"],
    roles: ["support"],
  },
  JarvanIV: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "wall", "auto-attack"],
    synergiesWith: ["Galio"],
    roles: ["jungle", "top", "support"],
  },
  Jax: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["dash", "auto-attack"],
    strongAgainst: ["auto-attack"],
    roles: ["top", "jungle"],
  },
  Jayce: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["top", "mid"],
  },
  Jhin: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "pick-potential", "auto-attack"],
    roles: ["adc"],
  },
  Jinx: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["adc"],
  },
  Kaisa: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["adc"],
  },
  Kalista: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
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
    tags: ["strong-ultimate", "auto-attack"],
    strongAgainst: ["assassin"],
    roles: ["top", "mid"],
  },
  Kayn: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "assassin", "auto-attack"],
    roles: ["top", "jungle"],
  },
  Kennen: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile", "wombo-combo", "auto-attack"],
    roles: ["top", "mid"],
  },
  Khazix: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential"],
    roles: ["jungle"],
  },
  Kindred: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["jungle"],
  },
  Kled: {
    damageTypes: ["physical-damage"],
    strongAgainst: ["healing"],
    roles: ["top", "mid"],
    tags: ["dash", "auto-attack"],
  },
  KogMaw: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["auto-attack"],
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
    tags: ["dash", "projectile", "auto-attack"],
    roles: ["jungle"],
  },
  Leona: {
    tags: ["dash", "cc", "pick-potential", "auto-attack"],
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
    tags: ["dash", "projectile", "auto-attack"],
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
    strongAgainst: ["auto-attack"],
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
    tags: ["auto-attack"],
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
    tags: ["projectile", "wombo-combo", "auto-attack"],
    roles: ["adc"],
  },
  MonkeyKing: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "wombo-combo", "auto-attack"],
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
    tags: ["dash", "assassin", "auto-attack"],
    roles: ["jungle", "mid"],
  },
  Nami: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "projectile"],
    roles: ["support"],
  },
  Nasus: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "auto-attack"],
    roles: ["jungle", "mid", "top"],
  },
  Nautilus: {
    tags: ["cc", "projectile", "pick-potential", "auto-attack"],
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
  Nilah: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "auto-attack"],
    roles: ["adc"],
    strongWith: ["healing", "shield"],
    strongAgainst: ["auto-attack"],
  },
  Nocturne: {
    damageTypes: ["physical-damage"],
    synergiesWith: ["Orianna"],
    tags: ["assassin", "auto-attack", "strong-ultimate"],
    roles: ["jungle"],
  },
  Nunu: { damageTypes: ["magic-damage"], roles: ["jungle", "mid", "support"] },
  Olaf: {
    damageTypes: ["physical-damage", "true-damage"],
    strongAgainst: ["cc"],
    tags: ["healing", "auto-attack"],
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
  Quinn: {
    damageTypes: ["physical-damage"],
    roles: ["top", "mid"],
    tags: ["auto-attack"],
  },
  Rakan: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "strong-ultimate"],
    synergiesWith: ["Xayah", "Orianna"],
    counters: ["Braum"],
    roles: ["support"],
  },
  Rammus: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["auto-attack"],
    strongAgainstDamageTypes: ["physical-damage"],
    roles: ["jungle", "top"],
  },
  RekSai: {
    damageTypes: ["physical-damage"],
    roles: ["jungle", "top"],
    tags: ["auto-attack"],
  },
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
    tags: ["dash", "assassin", "pick-potential", "auto-attack"],
    synergiesWith: ["Orianna", "Ivern", "Lulu"],
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
    tags: ["dash", "healing", "auto-attack"],
    strongAgainst: ["projectile"],
    roles: ["adc"],
  },
  Sejuani: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile", "pick-potential"],
    roles: ["jungle", "top"],
  },
  Senna: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "projectile", "auto-attack"],
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
    tags: ["assassin", "auto-attack"],
    roles: ["jungle", "support"],
  },
  Shen: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "cc", "shield"],
    strongAgainst: ["auto-attack"],
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
    tags: ["projectile", "auto-attack"],
    roles: ["adc"],
  },
  Skarner: {
    damageTypes: ["physical-damage"],
    roles: ["top", "jungle"],
    strongWith: ["wall"],
  },
  Smolder: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile", "auto-attack"],
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
    tags: ["strong-ultimate", "poison", "auto-attack"],
    roles: ["top", "jungle", "mid", "support"],
    strongAgainst: ["auto-attack"],
  },
  Thresh: {
    tags: ["cc", "projectile", "shield", "pick-potential"],
    roles: ["support"],
  },
  Tristana: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["adc", "mid"],
  },
  Trundle: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "wall", "auto-attack"],
    roles: ["top", "jungle", "support"],
  },
  Tryndamere: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "auto-attack"],
    roles: ["top", "jungle", "mid"],
  },
  TwistedFate: {
    damageTypes: ["magic-damage"],
    counters: ["Shaco"],
    tags: ["projectile", "pick-potential", "auto-attack"],
    roles: ["top", "mid"],
  },
  Twitch: {
    damageTypes: ["physical-damage"],
    tags: ["poison", "auto-attack"],
    roles: ["adc", "mid", "jungle"],
  },
  Udyr: {
    damageTypes: ["physical-damage"],
    tags: ["shield", "auto-attack"],
    roles: ["jungle", "top"],
  },
  Urgot: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile"],
    roles: ["top"],
  },
  Varus: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["strong-ultimate", "cc", "projectile", "auto-attack"],
    strongAgainst: ["healing"],
    roles: ["adc", "mid", "top"],
  },
  Vayne: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash", "auto-attack"],
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
  Vi: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["jungle"],
  },
  Viego: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "assassin", "auto-attack"],
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
    tags: ["healing", "shield", "auto-attack"],
    roles: ["jungle", "top"],
  },
  Warwick: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "auto-attack"],
    roles: ["jungle", "top"],
  },
  Xayah: {
    damageTypes: ["physical-damage"],
    tags: ["auto-attack"],
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
    tags: ["dash", "cc", "auto-attack"],
    roles: ["jungle", "top"],
  },
  Yasuo: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "wombo-combo", "auto-attack"],
    synergiesWith: ["Malphite", "Orianna", "Gragas"],
    strongAgainst: ["projectile"],
    roles: ["mid", "adc", "top"],
  },
  Yone: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile", "shield", "auto-attack"],
    roles: ["mid", "top"],
  },
  Yorick: {
    tags: ["auto-attack"],
    damageTypes: ["physical-damage"],
    roles: ["top", "jungle"],
  },
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
  Zeri: {
    damageTypes: ["physical-damage"],
    tags: ["auto-attack"],
    roles: ["adc"],
  },
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
} as const;

export type ChampionId = keyof typeof internalChampionTags;

export const championTags: Record<ChampionId, ChampionTags> =
  internalChampionTags;
