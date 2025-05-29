import { championTags } from "./champion-tags.js";

let champions = [];
let currentSelector = null;
let selectedGridIndex = -1;

async function loadChampions() {
  try {
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/en_US/champion.json",
    );
    const data = await response.json();
    champions = Object.values(data.data).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    renderChampionGrid();
  } catch (error) {
    console.error("Failed to load champions:", error);
  }
}

function renderChampionGrid(filter = "") {
  const grid = document.getElementById("championGrid");
  grid.innerHTML = "";

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(filter.toLowerCase()),
  );

  filteredChampions.forEach((champion, index) => {
    const item = document.createElement("div");
    item.className = "champion-grid-item";
    item.tabIndex = 0;
    item.setAttribute("data-index", index);
    item.setAttribute("data-champion-id", champion.id);
    item.onclick = () => selectChampion(champion);
    item.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectChampion(champion);
      }
    };

    item.innerHTML = `
      <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png" 
           alt="${champion.name}" class="champion-grid-image"
           onerror="this.style.display='none'">
      <div class="champion-grid-name">${champion.name}</div>
    `;

    grid.appendChild(item);
  });

  // Always select the first champion if there are any
  if (filteredChampions.length > 0) {
    selectedGridIndex = 0;
    const firstItem = grid.querySelector(".champion-grid-item");
    if (firstItem) {
      firstItem.classList.add("keyboard-selected");
    }
  } else {
    selectedGridIndex = -1;
  }
}

function selectChampion(champion) {
  if (!currentSelector) return;

  const image = currentSelector.querySelector(".champion-selector-image");
  const placeholder = currentSelector.querySelector(".champion-placeholder");

  image.src = `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png`;
  image.alt = champion.name;
  image.style.display = "block";
  placeholder.style.display = "none";

  // Store selected champion data
  currentSelector.setAttribute("data-champion", champion.id);

  // Check if this selector is in a team container and add new empty selector if needed
  const teamContainer = currentSelector.closest(".team-champions");
  if (teamContainer) {
    addNewChampionSelector(teamContainer);
  }

  // Update suggestions and team composition when a champion is selected
  updateSuggestions();
  updateTeamComposition();

  closeChampionModal();
}

function createChampionSelector() {
  const selector = document.createElement("button");
  selector.type = "button";
  selector.className = "champion-selector";
  selector.innerHTML = `
    <div class="champion-placeholder">+</div>
    <img
      src=""
      alt="Select Champion"
      class="champion-selector-image"
      style="display: none"
    />
  `;

  selector.onclick = () => {
    // If this selector already has a champion, remove it
    if (selector.hasAttribute("data-champion")) {
      removeChampion(selector);
    } else {
      openChampionModal(selector);
    }
  };
  return selector;
}

function removeChampion(selector) {
  // Get the team container before removing the selector
  const teamContainer = selector.closest(".team-champions");

  // Remove the entire selector from the DOM
  selector.remove();

  // Add a new empty selector if needed (since we might be under the 5 limit now)
  if (teamContainer) {
    addNewChampionSelector(teamContainer);
  }

  // Update suggestions and team composition after removing a champion
  updateSuggestions();
  updateTeamComposition();
}

function addNewChampionSelector(teamContainer) {
  // Check if there's already an empty selector (one without data-champion)
  const emptySelector = teamContainer.querySelector(
    ".champion-selector:not([data-champion])",
  );

  // Count current champions (excluding empty selectors)
  const selectedChampions = teamContainer.querySelectorAll(
    ".champion-selector[data-champion]",
  ).length;

  // Only add a new selector if there isn't already an empty one and we haven't reached the limit of 5
  if (!emptySelector && selectedChampions < 5) {
    const newSelector = createChampionSelector();
    teamContainer.appendChild(newSelector);
  }
}

function openChampionModal(selector) {
  currentSelector = selector;
  document.getElementById("championModal").style.display = "block";
  document.getElementById("championSearch").focus();
}

function closeChampionModal() {
  document.getElementById("championModal").style.display = "none";
  document.getElementById("championSearch").value = "";
  currentSelector = null;
  selectedGridIndex = -1;
  renderChampionGrid();
}

function navigateGrid(direction) {
  const grid = document.getElementById("championGrid");
  const items = Array.from(grid.querySelectorAll(".champion-grid-item"));

  if (items.length === 0) return;

  // Remove previous selection
  items.forEach((item) => item.classList.remove("keyboard-selected"));

  if (direction === "right" && selectedGridIndex < items.length - 1) {
    selectedGridIndex++;
  } else if (direction === "left" && selectedGridIndex > 0) {
    selectedGridIndex--;
  } else if (selectedGridIndex === -1 && items.length > 0) {
    selectedGridIndex = 0;
  }

  if (selectedGridIndex >= 0 && selectedGridIndex < items.length) {
    const selectedItem = items[selectedGridIndex];
    selectedItem.classList.add("keyboard-selected");
    selectedItem.scrollIntoView({ block: "nearest" });
  }
}

function selectCurrentGridItem() {
  const grid = document.getElementById("championGrid");
  const items = Array.from(grid.querySelectorAll(".champion-grid-item"));

  if (selectedGridIndex >= 0 && selectedGridIndex < items.length) {
    const selectedItem = items[selectedGridIndex];
    const championId = selectedItem.getAttribute("data-champion-id");
    const champion = champions.find((c) => c.id === championId);
    if (champion) {
      selectChampion(champion);
    }
  }
}

function initChampionSelector() {
  const modal = document.getElementById("championModal");
  const closeBtn = document.getElementById("closeModal");
  const searchInput = document.getElementById("championSearch");

  // Add initial empty selectors to both teams
  const allyTeam = document.querySelector('[data-team="ally"]');
  const enemyTeam = document.querySelector('[data-team="enemy"]');
  allyTeam.appendChild(createChampionSelector());
  enemyTeam.appendChild(createChampionSelector());

  closeBtn.onclick = closeChampionModal;

  modal.onclick = (event) => {
    if (event.target === modal) closeChampionModal();
  };

  searchInput.oninput = (event) => {
    renderChampionGrid(event.target.value);
  };

  searchInput.onkeydown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        navigateGrid("down");
        break;
      case "ArrowUp":
        event.preventDefault();
        navigateGrid("up");
        break;
      case "Enter":
        event.preventDefault();
        selectCurrentGridItem();
        break;
      case "Escape":
        event.preventDefault();
        closeChampionModal();
        break;
    }
  };

  loadChampions();
}

function getDamageComposition(champions) {
  const damageCount = {
    "magic-damage": 0,
    "physical-damage": 0,
    "true-damage": 0,
  };
  let totalSources = 0;

  champions.forEach((championId) => {
    const tags = championTags[championId];
    if (tags && tags.damageTypes) {
      tags.damageTypes.forEach((type) => {
        damageCount[type]++;
        totalSources++;
      });
    }
  });

  // Convert to percentages
  const composition = {};
  Object.keys(damageCount).forEach((type) => {
    if (damageCount[type] > 0) {
      composition[type] = Math.round((damageCount[type] / totalSources) * 100);
    }
  });

  return composition;
}

function createSuggestion(reason, championList, needsPhysical, needsMagic) {
  const validChampions = championList.filter((name) => championTags[name]);
  if (validChampions.length === 0) return null;

  const championPriorities = validChampions.map((name) => {
    const champion = championTags[name];
    let priority = true;

    if (needsPhysical && !champion.damageTypes.includes("physical-damage")) {
      priority = false;
    } else if (needsMagic && !champion.damageTypes.includes("magic-damage")) {
      priority = false;
    }

    return { name, priority };
  });

  return {
    reason,
    champions: validChampions,
    championPriorities,
  };
}

function generateCounterSuggestion(
  enemyChampions,
  tag,
  minCount,
  reason,
  needsPhysical,
  needsMagic,
) {
  let tagCount = 0;
  const triggeringEnemies = [];
  enemyChampions.forEach((championId) => {
    const champion = championTags[championId];
    if (champion && champion.tags && champion.tags.includes(tag)) {
      tagCount++;
      triggeringEnemies.push(championId);
    }
  });

  if (tagCount >= minCount) {
    const counterChampions = Object.keys(championTags).filter((champName) => {
      const champ = championTags[champName];
      return champ.strongAgainst && champ.strongAgainst.includes(tag);
    });

    if (counterChampions.length > 0) {
      const suggestion = createSuggestion(
        reason,
        counterChampions,
        needsPhysical,
        needsMagic,
      );
      if (suggestion) {
        suggestion.triggeringEnemies = triggeringEnemies;
      }
      return suggestion;
    }
  }
  return null;
}

function generateOpportunitySuggestion(
  enemyChampions,
  tag,
  maxCount,
  reason,
  needsPhysical,
  needsMagic,
) {
  let tagCount = 0;
  enemyChampions.forEach((championId) => {
    const champion = championTags[championId];
    if (champion && champion.tags && champion.tags.includes(tag)) {
      tagCount++;
    }
  });

  if (enemyChampions.length >= 3 && tagCount <= maxCount) {
    const opportunityChampions = Object.keys(championTags).filter((champName) => {
      const champ = championTags[champName];
      return champ.weakAgainst && champ.weakAgainst.includes(tag);
    });

    if (opportunityChampions.length > 0) {
      return createSuggestion(
        reason,
        opportunityChampions,
        needsPhysical,
        needsMagic,
      );
    }
  }
  return null;
}

function generateDamageSuggestions(
  enemyDamageComposition,
  enemyChampions,
  needsPhysical,
  needsMagic,
) {
  const suggestions = [];

  if (
    enemyChampions.length >= 2 &&
    enemyDamageComposition["magic-damage"] &&
    enemyDamageComposition["magic-damage"] > 50
  ) {
    const suggestion = createSuggestion(
      "Strong against magic damage (>50%)",
      ["Galio", "Kassadin"],
      needsPhysical,
      needsMagic,
    );
    if (suggestion) {
      // Find enemies with magic damage
      suggestion.triggeringEnemies = enemyChampions.filter((championId) => {
        const champion = championTags[championId];
        return (
          champion &&
          champion.damageTypes &&
          champion.damageTypes.includes("magic-damage")
        );
      });
      suggestions.push(suggestion);
    }
  }

  if (
    enemyChampions.length >= 2 &&
    enemyDamageComposition["physical-damage"] &&
    enemyDamageComposition["physical-damage"] > 50
  ) {
    const suggestion = createSuggestion(
      "Strong against physical damage (>50%)",
      ["Malphite", "Rammus", "MonkeyKing"],
      needsPhysical,
      needsMagic,
    );
    if (suggestion) {
      // Find enemies with physical damage
      suggestion.triggeringEnemies = enemyChampions.filter((championId) => {
        const champion = championTags[championId];
        return (
          champion &&
          champion.damageTypes &&
          champion.damageTypes.includes("physical-damage")
        );
      });
      suggestions.push(suggestion);
    }
  }

  return suggestions;
}

function generateSpecificCounterSuggestions(
  enemyChampions,
  needsPhysical,
  needsMagic,
) {
  const suggestions = [];
  const counterMap = {};

  // Build map of champions that counter specific enemies
  Object.keys(championTags).forEach((championName) => {
    const champion = championTags[championName];
    if (champion.counters) {
      champion.counters.forEach((targetChampion) => {
        if (!counterMap[targetChampion]) {
          counterMap[targetChampion] = [];
        }
        counterMap[targetChampion].push(championName);
      });
    }
  });

  // Check each enemy for specific counters
  enemyChampions.forEach((enemyChampion) => {
    if (counterMap[enemyChampion]) {
      const counters = counterMap[enemyChampion];
      const suggestion = createSuggestion(
        `Good against ${enemyChampion}`,
        counters,
        needsPhysical,
        needsMagic,
      );
      if (suggestion) {
        suggestion.triggeringEnemies = [enemyChampion];
        suggestions.push(suggestion);
      }
    }
  });

  return suggestions;
}

function generateTagCounterSuggestions(
  enemyChampions,
  needsPhysical,
  needsMagic,
) {
  const suggestions = [];

  const dashSuggestion = generateCounterSuggestion(
    enemyChampions,
    "dash",
    2,
    "Strong against dashes",
    needsPhysical,
    needsMagic,
  );
  if (dashSuggestion) suggestions.push(dashSuggestion);

  const healingSuggestion = generateCounterSuggestion(
    enemyChampions,
    "healing",
    1,
    "Has built-in Grievous Wounds",
    needsPhysical,
    needsMagic,
  );
  if (healingSuggestion) suggestions.push(healingSuggestion);

  const assassinSuggestion = generateCounterSuggestion(
    enemyChampions,
    "assassin",
    2,
    "Strong against assassins",
    needsPhysical,
    needsMagic,
  );
  if (assassinSuggestion) suggestions.push(assassinSuggestion);

  const ccSuggestion = generateCounterSuggestion(
    enemyChampions,
    "cc",
    2,
    "Strong against crowd control",
    needsPhysical,
    needsMagic,
  );
  if (ccSuggestion) suggestions.push(ccSuggestion);

  const lowCCSuggestion = generateOpportunitySuggestion(
    enemyChampions,
    "cc",
    1,
    "Good against low CC teams",
    needsPhysical,
    needsMagic,
  );
  if (lowCCSuggestion) suggestions.push(lowCCSuggestion);

  const strongUltimateSuggestion = generateCounterSuggestion(
    enemyChampions,
    "strong-ultimate",
    2,
    "Can steal powerful ultimates",
    needsPhysical,
    needsMagic,
  );
  if (strongUltimateSuggestion) suggestions.push(strongUltimateSuggestion);

  return suggestions;
}

function generateSynergySuggestions(allyChampions, needsPhysical, needsMagic) {
  const suggestions = [];
  const synergyMap = {};

  // Build map of champions that synergize with specific allies
  Object.keys(championTags).forEach((championName) => {
    const champion = championTags[championName];
    if (champion.synergiesWith) {
      champion.synergiesWith.forEach((synergyChampion) => {
        if (!synergyMap[synergyChampion]) {
          synergyMap[synergyChampion] = [];
        }
        synergyMap[synergyChampion].push(championName);
      });
    }
  });

  // Check each ally for synergy opportunities
  allyChampions.forEach((allyChampion) => {
    if (synergyMap[allyChampion]) {
      const synergyPartners = synergyMap[allyChampion].filter(
        (partner) => !allyChampions.includes(partner), // Don't suggest champions already on team
      );

      if (synergyPartners.length > 0) {
        const suggestion = createSuggestion(
          `Synergizes with ${allyChampion}`,
          synergyPartners,
          needsPhysical,
          needsMagic,
        );
        if (suggestion) {
          suggestion.triggeringAllies = [allyChampion];
          suggestions.push(suggestion);
        }
      }
    }
  });

  return suggestions;
}

function generateBalanceSuggestions(allyChampions, hasPhysical, hasMagic) {
  const suggestions = [];

  if (allyChampions.length >= 3) {
    if (hasPhysical && !hasMagic) {
      suggestions.push({
        reason: "Add magic damage to your team",
        champions: ["Syndra", "Ahri", "Lux", "Brand"].filter(
          (champ) => championTags[champ],
        ),
      });
    } else if (hasMagic && !hasPhysical) {
      suggestions.push({
        reason: "Add physical damage to your team",
        champions: ["Jinx", "Caitlyn", "Zed", "Yasuo"].filter(
          (champ) => championTags[champ],
        ),
      });
    }
  }

  return suggestions;
}

function renderSuggestions(suggestions) {
  let html = '<div class="suggestions">';
  if (suggestions.length > 0) {
    suggestions.forEach((suggestion) => {
      if (suggestion.champions.length > 0) {
        html += `<div class="suggestion-group">
          <div class="suggestion-header">
            <h4>${suggestion.reason}</h4>`;

        // Show triggering enemy champions if available
        if (
          suggestion.triggeringEnemies &&
          suggestion.triggeringEnemies.length > 0
        ) {
          html += `<div class="triggering-enemies">
            <span class="because-of">counters:</span>`;
          suggestion.triggeringEnemies.forEach((enemyId) => {
            html += `<img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${enemyId}.png" 
                     alt="${enemyId}" class="triggering-enemy-icon" title="${enemyId}">`;
          });
          html += `</div>`;
        }

        // Show triggering ally champions for synergies
        if (
          suggestion.triggeringAllies &&
          suggestion.triggeringAllies.length > 0
        ) {
          html += `<div class="triggering-allies">
            <span class="because-of">synergizes with:</span>`;
          suggestion.triggeringAllies.forEach((allyId) => {
            html += `<img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${allyId}.png" 
                     alt="${allyId}" class="triggering-ally-icon" title="${allyId}">`;
          });
          html += `</div>`;
        }

        html += `</div>
          <div class="suggested-champions">`;

        if (suggestion.championPriorities) {
          suggestion.championPriorities.forEach((champ) => {
            const championClass =
              champ.priority === false ? " secondary-champion" : "";
            html += `<div class="suggested-champion${championClass}">
              <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champ.name}.png" 
                   alt="${champ.name}" class="suggested-champion-image">
            </div>`;
          });
        } else {
          suggestion.champions.forEach((championName) => {
            html += `<div class="suggested-champion">
              <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${championName}.png" 
                   alt="${championName}" class="suggested-champion-image">
            </div>`;
          });
        }

        html += "</div></div>";
      }
    });
  } else {
    html += "<p>Build your team to see suggestions</p>";
  }
  html += "</div>";

  return html;
}

function updateSuggestions() {
  const enemyChampions = getTeamChampions("enemy");
  const allyChampions = getTeamChampions("ally");
  const suggestionsContent = document.getElementById("suggestions-content");

  const enemyDamageComposition = getDamageComposition(enemyChampions);
  const allyDamageComposition = getDamageComposition(allyChampions);

  const hasPhysical = allyDamageComposition["physical-damage"] > 0;
  const hasMagic = allyDamageComposition["magic-damage"] > 0;
  const needsPhysical = allyChampions.length >= 4 && !hasPhysical;
  const needsMagic = allyChampions.length >= 4 && !hasMagic;

  let suggestions = [];

  suggestions.push(
    ...generateSynergySuggestions(allyChampions, needsPhysical, needsMagic),
  );
  suggestions.push(
    ...generateSpecificCounterSuggestions(
      enemyChampions,
      needsPhysical,
      needsMagic,
    ),
  );
  suggestions.push(
    ...generateDamageSuggestions(
      enemyDamageComposition,
      enemyChampions,
      needsPhysical,
      needsMagic,
    ),
  );
  suggestions.push(
    ...generateTagCounterSuggestions(enemyChampions, needsPhysical, needsMagic),
  );
  suggestions.push(
    ...generateBalanceSuggestions(allyChampions, hasPhysical, hasMagic),
  );

  suggestionsContent.innerHTML = renderSuggestions(suggestions);
}

function getTeamChampions(team) {
  const teamContainer = document.querySelector(`[data-team="${team}"]`);
  return Array.from(teamContainer.querySelectorAll("[data-champion]"))
    .map((selector) => selector.getAttribute("data-champion"))
    .filter((champion) => champion !== null);
}

function updateTeamCompositionDisplay(team) {
  const champions = getTeamChampions(team);
  const compositionDiv = document.getElementById(`${team}-damage-composition`);

  if (champions.length === 0) {
    compositionDiv.innerHTML =
      '<div class="team-combined-damage-bar empty-bar"></div>';
    return;
  }

  const damageComposition = getDamageComposition(champions);

  if (Object.keys(damageComposition).length === 0) {
    compositionDiv.innerHTML =
      '<div class="team-combined-damage-bar empty-bar"></div>';
    return;
  }

  compositionDiv.style.display = "block";

  let html = '<div class="team-combined-damage-bar">';

  if (damageComposition["magic-damage"]) {
    html += `<div class="team-damage-segment magic-damage" style="width: ${damageComposition["magic-damage"]}%">
      <span class="team-damage-segment-label">Magic ${damageComposition["magic-damage"]}%</span>
    </div>`;
  }

  if (damageComposition["physical-damage"]) {
    html += `<div class="team-damage-segment physical-damage" style="width: ${damageComposition["physical-damage"]}%">
      <span class="team-damage-segment-label">Physical ${damageComposition["physical-damage"]}%</span>
    </div>`;
  }

  if (damageComposition["true-damage"]) {
    html += `<div class="team-damage-segment true-damage" style="width: ${damageComposition["true-damage"]}%">
      <span class="team-damage-segment-label">True ${damageComposition["true-damage"]}%</span>
    </div>`;
  }

  html += "</div>";

  compositionDiv.innerHTML = html;
}

function updateTeamComposition() {
  updateTeamCompositionDisplay("ally");
  updateTeamCompositionDisplay("enemy");
}

window.addEventListener("load", initChampionSelector);
