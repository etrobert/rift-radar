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
  | "auto-attack"
  | "ally-ms-buff"
  | "immobile"
  | "melee";

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
    tags: ["dash", "healing", "melee"],
    roles: ["top"],
    strongWith: ["ally-ms-buff"],
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
    tags: ["dash", "assassin", "melee"],
    roles: ["mid", "top"],
  },
  Akshan: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "projectile", "auto-attack"],
    roles: ["mid", "top"],
  },
  Alistar: {
    tags: ["dash", "cc", "strong-ultimate", "wombo-combo", "melee"],
    synergiesWith: ["Kalista"],
    roles: ["support"],
  },
  Ambessa: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "melee"],
    roles: ["top", "jungle", "mid"],
  },
  Amumu: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile", "wombo-combo", "melee"],
    roles: ["jungle", "support"],
  },
  Anivia: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "wall", "immobile"],
    roles: ["mid", "support", "top"],
  },
  Annie: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "wombo-combo", "immobile"],
    roles: ["mid", "support"],
  },
  Aphelios: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack", "immobile"],
    roles: ["adc"],
  },
  Ashe: {
    damageTypes: ["physical-damage"],
    tags: [
      "strong-ultimate",
      "projectile",
      "pick-potential",
      "auto-attack",
      "immobile",
    ],
    roles: ["adc", "support"],
    strongAgainst: ["immobile"],
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
    tags: ["dash", "auto-attack", "melee"],
    damageTypes: ["physical-damage"],
    roles: ["jungle"],
  },
  Blitzcrank: {
    tags: ["cc", "projectile", "pick-potential", "auto-attack", "melee"],
    strongAgainst: ["shield"],
    roles: ["support"],
  },
  Brand: {
    damageTypes: ["magic-damage"],
    tags: ["wombo-combo", "immobile", "projectile"],
    roles: ["support", "mid"],
  },
  Braum: {
    synergiesWith: ["Lucian"],
    strongAgainst: ["projectile", "auto-attack", "melee"],
    roles: ["support"],
    tags: ["melee"],
  },
  Briar: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack", "melee"],
    roles: ["jungle"],
  },
  Caitlyn: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "auto-attack"],
    roles: ["adc"],
  },
  Camille: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash", "auto-attack", "melee"],
    synergiesWith: ["Galio"],
    roles: ["top", "support"],
    strongWith: ["wall"],
  },
  Cassiopeia: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["dash"],
    tags: ["projectile", "poison", "immobile"],
    strongWith: ["poison"],
    roles: ["top", "mid", "adc"],
  },
  Chogath: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "melee"],
    roles: ["top", "mid", "jungle", "support"],
    strongWith: ["ally-ms-buff"],
  },
  Corki: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["dash", "projectile", "auto-attack"],
    roles: ["mid", "adc"],
  },
  Darius: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["healing", "auto-attack", "melee"],
    roles: ["top"],
    strongWith: ["ally-ms-buff"],
  },
  Diana: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "projectile", "auto-attack", "melee"],
    roles: ["mid", "jungle"],
  },
  Draven: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["adc"],
    strongWith: ["ally-ms-buff"],
  },
  DrMundo: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "auto-attack", "melee"],
    roles: ["top", "jungle"],
    strongWith: ["ally-ms-buff"],
  },
  Ekko: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "assassin", "auto-attack", "melee"],
    roles: ["mid", "jungle"],
  },
  Elise: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "pick-potential", "assassin"],
    roles: ["jungle", "support"],
    strongAgainst: ["immobile"],
  },
  Evelynn: {
    damageTypes: ["magic-damage"],
    tags: ["assassin", "melee"],
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
    tags: ["dash", "healing", "auto-attack", "melee"],
    roles: ["top"],
  },
  Fizz: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "projectile", "auto-attack", "melee"],
    roles: ["mid"],
  },
  Galio: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "cc", "strong-ultimate", "melee"],
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
    tags: ["auto-attack", "melee"],
    roles: ["top", "mid"],
    strongWith: ["ally-ms-buff"],
  },
  Gnar: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack", "wombo-combo"],
    roles: ["top"],
  },
  Gragas: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile", "melee"],
    roles: ["jungle", "top", "mid", "support"],
  },
  Graves: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["jungle"],
  },
  Gwen: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["dash", "auto-attack", "melee"],
    roles: ["top", "jungle"],
    strongWith: ["ally-ms-buff"],
  },
  Hecarim: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "auto-attack", "melee"],
    roles: ["jungle"],
    strongWith: ["ally-ms-buff"],
  },
  Heimerdinger: {
    damageTypes: ["magic-damage"],
    tags: ["immobile"],
    roles: ["mid", "top", "adc", "support"],
  },
  Hwei: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "ally-ms-buff", "immobile"],
    roles: ["mid", "adc", "support"],
  },
  Illaoi: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "auto-attack", "immobile", "melee"],
    roles: ["top", "mid"],
  },
  Irelia: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "auto-attack", "melee"],
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
    tags: ["dash", "wall", "auto-attack", "melee"],
    synergiesWith: ["Galio"],
    roles: ["jungle", "top", "support"],
    strongAgainst: ["immobile"],
  },
  Jax: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["dash", "auto-attack", "melee"],
    strongAgainst: ["auto-attack"],
    roles: ["top", "jungle"],
    strongWith: ["ally-ms-buff"],
  },
  Jayce: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["top", "mid"],
  },
  Jhin: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "pick-potential", "auto-attack", "immobile"],
    roles: ["adc"],
  },
  Jinx: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack", "immobile"],
    roles: ["adc"],
    strongWith: ["ally-ms-buff"],
  },
  Kaisa: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["adc"],
    strongWith: ["ally-ms-buff"],
  },
  Kalista: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    synergiesWith: ["Alistar", "Neeko"],
    roles: ["top", "adc"],
  },
  Karma: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "shield", "ally-ms-buff"],
    roles: ["support", "mid"],
  },
  Karthus: { damageTypes: ["magic-damage"], roles: ["jungle", "mid", "adc"] },
  Kassadin: {
    damageTypes: ["magic-damage"],
    tags: ["assassin", "melee"],
    strongAgainstDamageTypes: ["magic-damage"],
    roles: ["mid"],
  },
  Katarina: {
    damageTypes: ["magic-damage"],
    tags: ["assassin", "melee"],
    strongAgainst: ["healing"],
    weakAgainst: ["cc"],
    roles: ["mid"],
  },
  Kayle: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["strong-ultimate", "auto-attack", "ally-ms-buff", "immobile"],
    strongAgainst: ["assassin"],
    roles: ["top", "mid"],
  },
  Kayn: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "assassin", "auto-attack", "melee"],
    roles: ["top", "jungle"],
  },
  Kennen: {
    damageTypes: ["magic-damage"],
    tags: [
      "strong-ultimate",
      "projectile",
      "wombo-combo",
      "auto-attack",
      "immobile",
    ],
    roles: ["top", "mid"],
  },
  Khazix: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential", "melee"],
    roles: ["jungle"],
  },
  Kindred: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["jungle"],
    synergiesWith: ["Zilean"],
    strongWith: ["ally-ms-buff"],
  },
  Kled: {
    damageTypes: ["physical-damage"],
    strongAgainst: ["healing"],
    roles: ["top", "mid"],
    tags: ["dash", "auto-attack", "melee"],
  },
  KogMaw: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["auto-attack", "immobile"],
    roles: ["adc", "mid"],
  },
  KSante: { damageTypes: ["physical-damage"], roles: ["top"], tags: ["melee"] },
  Leblanc: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "assassin", "melee"],
    roles: ["mid", "support"],
  },
  LeeSin: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "auto-attack", "melee"],
    roles: ["jungle"],
  },
  Leona: {
    tags: ["dash", "cc", "pick-potential", "auto-attack", "melee"],
    roles: ["support"],
    strongAgainst: ["immobile"],
  },
  Lillia: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["projectile"],
    roles: ["jungle", "top"],
    strongWith: ["ally-ms-buff"],
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
    tags: ["ally-ms-buff", "shield", "immobile"],
  },
  Lux: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "shield", "immobile"],
    roles: ["support", "adc", "mid"],
    strongAgainst: ["immobile"],
  },
  Malphite: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "wombo-combo", "melee"],
    strongAgainst: ["auto-attack"],
    strongAgainstDamageTypes: ["physical-damage"],
    synergiesWith: ["Yasuo", "Yone", "Orianna"],
    roles: ["top", "mid", "jungle", "support"],
  },
  Malzahar: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "immobile"],
    strongAgainst: ["assassin"],
    roles: ["top", "mid"],
  },
  Maokai: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "cc", "projectile", "melee"],
    roles: ["top", "jungle", "support"],
    strongAgainst: ["immobile"],
  },
  MasterYi: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["auto-attack", "melee"],
    synergiesWith: ["Zilean"],
    weakAgainst: ["cc"],
    roles: ["top", "jungle"],
    strongWith: ["ally-ms-buff"],
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
    tags: ["dash", "wombo-combo", "auto-attack", "melee"],
    strongAgainstDamageTypes: ["physical-damage"],
    roles: ["top", "jungle"],
  },
  Mordekaiser: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "melee"],
    roles: ["top", "jungle", "mid"],
  },
  Morgana: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "projectile", "pick-potential"],
    strongAgainst: ["cc", "immobile"],
    roles: ["support", "jungle", "mid"],
  },
  Naafiri: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "auto-attack", "melee"],
    roles: ["jungle", "mid"],
  },
  Nami: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "projectile", "ally-ms-buff", "immobile"],
    roles: ["support"],
  },
  Nasus: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "auto-attack", "melee"],
    roles: ["jungle", "mid", "top"],
    strongWith: ["ally-ms-buff"],
  },
  Nautilus: {
    tags: ["cc", "projectile", "pick-potential", "auto-attack", "melee"],
    roles: ["support"],
    strongAgainst: ["immobile", "dash"],
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
    strongAgainst: ["immobile"],
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
    tags: ["assassin", "auto-attack", "strong-ultimate", "melee"],
    roles: ["jungle"],
    strongAgainst: ["immobile"],
  },
  Nunu: {
    damageTypes: ["magic-damage"],
    roles: ["jungle", "mid", "support"],
    tags: ["melee"],
  },
  Olaf: {
    damageTypes: ["physical-damage", "true-damage"],
    strongAgainst: ["cc"],
    tags: ["healing", "auto-attack", "melee"],
    roles: ["jungle", "top"],
    strongWith: ["ally-ms-buff"],
  },
  Orianna: {
    damageTypes: ["magic-damage"],
    tags: [
      "strong-ultimate",
      "shield",
      "wombo-combo",
      "ally-ms-buff",
      "immobile",
    ],
    synergiesWith: ["Nocturne", "Malphite", "Yasuo", "Rakan", "Rengar"],
    roles: ["mid"],
  },
  Ornn: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "wall", "melee"],
    roles: ["top"],
  },
  Pantheon: {
    damageTypes: ["physical-damage"],
    roles: ["jungle", "mid", "top", "support"],
    tags: ["melee"],
  },
  Poppy: {
    damageTypes: ["physical-damage"],
    strongAgainst: ["dash"],
    strongWith: ["wall"],
    roles: ["top", "jungle", "support"],
    tags: ["melee"],
  },
  Pyke: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "projectile", "pick-potential", "melee"],
    roles: ["support"],
    strongAgainst: ["immobile"],
  },
  Qiyana: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "melee"],
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
    strongAgainst: ["immobile"],
  },
  Rammus: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["auto-attack"],
    strongAgainstDamageTypes: ["physical-damage"],
    roles: ["jungle", "top"],
    tags: ["melee"],
  },
  RekSai: {
    damageTypes: ["physical-damage"],
    roles: ["jungle", "top"],
    tags: ["auto-attack", "melee"],
  },
  Rell: { tags: ["shield", "ally-ms-buff", "melee"], roles: ["support"] },
  Renata: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile", "ally-ms-buff", "immobile"],
    roles: ["support"],
  },
  Renekton: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "melee"],
    strongAgainst: ["shield"],
    roles: ["top", "mid"],
  },
  Rengar: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential", "auto-attack", "melee"],
    synergiesWith: ["Orianna", "Ivern", "Lulu"],
    roles: ["jungle", "top"],
  },
  Riven: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "shield", "melee"],
    roles: ["top", "mid"],
  },
  Rumble: {
    damageTypes: ["magic-damage"],
    tags: ["immobile", "wombo-combo", "projectile"],
    strongWith: ["wall"],
    roles: ["top", "mid", "jungle"],
    strongAgainst: ["immobile"],
  },
  Ryze: {
    damageTypes: ["magic-damage"],
    tags: ["immobile"],
    roles: ["mid", "top"],
  },
  Samira: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "auto-attack"],
    strongAgainst: ["projectile"],
    roles: ["adc"],
  },
  Sejuani: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "projectile", "pick-potential", "melee"],
    roles: ["jungle", "top"],
    strongAgainst: ["immobile"],
    strongWith: ["melee"],
  },
  Senna: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "projectile", "auto-attack", "immobile"],
    roles: ["support", "adc"],
  },
  Seraphine: {
    damageTypes: ["magic-damage"],
    tags: [
      "healing",
      "strong-ultimate",
      "projectile",
      "shield",
      "ally-ms-buff",
      "immobile",
    ],
    roles: ["support", "mid"],
  },
  Sett: {
    damageTypes: ["physical-damage", "true-damage"],
    roles: ["top", "mid", "support"],
    tags: ["melee"],
  },
  Shaco: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["assassin", "auto-attack", "melee"],
    roles: ["jungle", "support"],
  },
  Shen: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "strong-ultimate", "cc", "shield", "melee"],
    strongAgainst: ["auto-attack"],
    roles: ["top", "jungle", "mid", "support"],
  },
  Shyvana: {
    damageTypes: ["magic-damage", "physical-damage"],
    roles: ["top", "jungle"],
    strongWith: ["ally-ms-buff"],
    tag: ["melee"],
  },
  Singed: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["healing"],
    tags: ["poison", "melee"],
    roles: ["top", "mid"],
    strongWith: ["ally-ms-buff"],
  },
  Sion: {
    damageTypes: ["physical-damage"],
    tags: ["cc", "immobile", "wombo-combo", "melee"],
    roles: ["top", "jungle", "mid", "support"],
  },
  Sivir: {
    damageTypes: ["physical-damage"],
    tags: ["projectile", "auto-attack", "ally-ms-buff"],
    roles: ["adc"],
  },
  Skarner: {
    damageTypes: ["physical-damage"],
    roles: ["top", "jungle"],
    strongWith: ["wall"],
    tags: ["melee"],
  },
  Smolder: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["projectile", "auto-attack"],
    roles: ["top", "mid", "adc"],
  },
  Sona: {
    damageTypes: ["magic-damage"],
    tags: [
      "healing",
      "strong-ultimate",
      "projectile",
      "shield",
      "ally-ms-buff",
      "immobile",
    ],
    roles: ["support"],
  },
  Soraka: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "immobile"],
    roles: ["support"],
  },
  Swain: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "strong-ultimate", "immobile", "projectile"],
    roles: ["support", "mid", "adc", "top"],
    strongWith: ["ally-ms-buff"],
  },
  Sylas: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "projectile", "melee"],
    strongAgainst: ["strong-ultimate"],
    roles: ["mid", "jungle", "top", "support"],
  },
  Syndra: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "pick-potential", "immobile"],
    roles: ["mid"],
  },
  TahmKench: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["assassin"],
    tags: ["shield", "melee"],
    roles: ["support", "top"],
  },
  Taliyah: {
    damageTypes: ["magic-damage"],
    strongAgainst: ["dash", "immobile"],
    tags: ["projectile", "wall", "immobile"],
    roles: ["jungle", "mid", "support"],
  },
  Talon: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential", "melee"],
    roles: ["mid", "jungle"],
  },
  Taric: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "shield", "immobile", "melee"],
    roles: ["support"],
  },
  Teemo: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "poison", "auto-attack", "immobile"],
    roles: ["top", "jungle", "mid", "support"],
    strongAgainst: ["auto-attack"],
  },
  Thresh: {
    tags: ["cc", "projectile", "shield", "pick-potential", "immobile"],
    roles: ["support"],
    strongAgainst: ["immobile"],
  },
  Tristana: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack"],
    roles: ["adc", "mid"],
  },
  Trundle: {
    damageTypes: ["physical-damage"],
    tags: ["healing", "wall", "auto-attack", "melee"],
    roles: ["top", "jungle", "support"],
    strongWith: ["ally-ms-buff"],
    strongAgainst: ["immobile"],
  },
  Tryndamere: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "auto-attack", "melee"],
    roles: ["top", "jungle", "mid"],
    strongWith: ["ally-ms-buff"],
  },
  TwistedFate: {
    damageTypes: ["magic-damage"],
    counters: ["Shaco"],
    tags: ["projectile", "pick-potential", "auto-attack", "immobile"],
    roles: ["top", "mid"],
  },
  Twitch: {
    damageTypes: ["physical-damage"],
    tags: ["poison", "auto-attack", "immobile"],
    roles: ["adc", "mid", "jungle"],
    strongWith: ["ally-ms-buff"],
  },
  Udyr: {
    damageTypes: ["physical-damage"],
    tags: ["shield", "auto-attack", "melee"],
    roles: ["jungle", "top"],
    strongWith: ["ally-ms-buff"],
  },
  Urgot: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile"],
    roles: ["top"],
  },
  Varus: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: ["strong-ultimate", "cc", "projectile", "auto-attack", "immobile"],
    strongAgainst: ["healing", "immobile"],
    roles: ["adc", "mid", "top"],
  },
  Vayne: {
    damageTypes: ["physical-damage", "true-damage"],
    tags: ["dash", "auto-attack"],
    strongWith: ["wall", "ally-ms-buff"],
    roles: ["adc", "top", "mid"],
  },
  Veigar: {
    damageTypes: ["magic-damage"],
    tags: ["cc", "projectile", "immobile"],
    roles: ["mid", "adc", "support", "top"],
  },
  Velkoz: {
    damageTypes: ["magic-damage", "true-damage"],
    tags: ["projectile", "immobile"],
    roles: ["support", "mid", "adc"],
    strongAgainst: ["immobile"],
  },
  Vex: { damageTypes: ["magic-damage"], tags: ["projectile"], roles: ["mid"] },
  Vi: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "auto-attack", "melee"],
    roles: ["jungle"],
  },
  Viego: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "assassin", "auto-attack", "melee"],
    roles: ["jungle"],
    strongWith: ["ally-ms-buff"],
  },
  Viktor: {
    damageTypes: ["magic-damage"],
    tags: ["shield", "immobile"],
    roles: ["mid", "top", "adc"],
  },
  Vladimir: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "immobile"],
    roles: ["mid", "top"],
    strongWith: ["ally-ms-buff"],
  },
  Volibear: {
    damageTypes: ["magic-damage", "physical-damage"],
    tags: ["healing", "shield", "auto-attack", "melee"],
    roles: ["jungle", "top"],
    strongWith: ["ally-ms-buff"],
  },
  Warwick: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "healing", "auto-attack", "melee"],
    roles: ["jungle", "top"],
    strongWith: ["ally-ms-buff"],
    strongAgainst: ["immobile"],
  },
  Xayah: {
    damageTypes: ["physical-damage"],
    tags: ["auto-attack", "immobile"],
    synergiesWith: ["Rakan"],
    roles: ["adc"],
    strongAgainst: ["ally-ms-buff"],
  },
  Xerath: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "immobile"],
    roles: ["mid", "support"],
    strongAgainst: ["immobile"],
  },
  XinZhao: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "cc", "auto-attack", "melee"],
    roles: ["jungle", "top"],
  },
  Yasuo: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "projectile", "wombo-combo", "auto-attack", "melee"],
    synergiesWith: ["Malphite", "Orianna", "Gragas"],
    strongAgainst: ["projectile"],
    roles: ["mid", "adc", "top"],
  },
  Yone: {
    damageTypes: ["physical-damage", "magic-damage"],
    tags: [
      "dash",
      "strong-ultimate",
      "projectile",
      "shield",
      "auto-attack",
      "melee",
    ],
    roles: ["mid", "top"],
  },
  Yorick: {
    tags: ["auto-attack", "melee"],
    damageTypes: ["physical-damage"],
    roles: ["top", "jungle"],
    strongWith: ["ally-ms-buff"],
  },
  Yuumi: {
    damageTypes: ["magic-damage"],
    tags: ["healing", "shield", "ally-ms-buff"],
    roles: ["support"],
  },
  Zac: {
    damageTypes: ["magic-damage"],
    tags: ["dash", "healing", "melee"],
    roles: ["jungle", "top", "support"],
    strongAgainst: ["immobile"],
  },
  Zed: {
    damageTypes: ["physical-damage"],
    tags: ["dash", "assassin", "pick-potential", "melee"],
    roles: ["mid", "jungle"],
  },
  Zeri: {
    damageTypes: ["physical-damage"],
    tags: ["auto-attack"],
    roles: ["adc"],
    strongWith: ["ally-ms-buff"],
  },
  Ziggs: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "immobile"],
    roles: ["mid", "adc", "support"],
  },
  Zilean: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "ally-ms-buff"],
    strongAgainst: ["assassin", "immobile"],
    counters: ["Galio"],
    synergiesWith: ["MasterYi", "Kindred"],
    roles: ["support", "mid", "top"],
  },
  Zoe: {
    damageTypes: ["magic-damage"],
    tags: ["projectile"],
    roles: ["mid", "support"],
  },
  Zyra: {
    damageTypes: ["magic-damage"],
    tags: ["strong-ultimate", "projectile", "immobile"],
    roles: ["support", "mid", "jungle"],
    strongAgainst: ["immobile"],
  },
  Mel: {
    damageTypes: ["magic-damage"],
    tags: ["projectile", "immobile"],
    strongAgainst: ["projectile"],
    roles: ["support", "mid", "adc"],
  },
} as const;

export type ChampionId = keyof typeof internalChampionTags;

export const championTags: Record<ChampionId, ChampionTags> =
  internalChampionTags;
