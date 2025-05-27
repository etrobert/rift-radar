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

function updateSuggestions() {
  const enemyChampions = getTeamChampions("enemy");
  const allyChampions = getTeamChampions("ally");

  const suggestionsContent = document.getElementById("suggestions-content");

  // Get damage compositions
  const enemyDamageComposition = getDamageComposition(enemyChampions);
  const allyDamageComposition = getDamageComposition(allyChampions);

  // Generate suggestions
  let suggestions = [];

  // Counter-pick suggestions based on enemy damage composition
  const hasPhysical = allyDamageComposition["physical-damage"] > 0;
  const hasMagic = allyDamageComposition["magic-damage"] > 0;
  const needsPhysical = allyChampions.length >= 4 && !hasPhysical;
  const needsMagic = allyChampions.length >= 4 && !hasMagic;

  if (
    enemyChampions.length >= 2 &&
    enemyDamageComposition["magic-damage"] &&
    enemyDamageComposition["magic-damage"] > 50
  ) {
    const allAntiMageChampions = ["Galio", "Kassadin"];
    let priorityChampions = [];
    let secondaryChampions = [];

    allAntiMageChampions.forEach((champ) => {
      if (!championTags[champ]) return;

      const champDamageTypes = championTags[champ].damageTypes;
      const fitsTeamNeeds =
        (!needsPhysical && !needsMagic) ||
        (needsPhysical && champDamageTypes.includes("physical-damage")) ||
        (needsMagic && champDamageTypes.includes("magic-damage"));

      if (fitsTeamNeeds) {
        priorityChampions.push(champ);
      } else {
        secondaryChampions.push(champ);
      }
    });

    if (priorityChampions.length > 0 || secondaryChampions.length > 0) {
      suggestions.push({
        reason: "Strong against magic damage (>50%)",
        champions: [...priorityChampions, ...secondaryChampions],
        championPriorities: [
          ...priorityChampions.map((c) => ({ name: c, priority: true })),
          ...secondaryChampions.map((c) => ({ name: c, priority: false })),
        ],
      });
    }
  }

  if (
    enemyChampions.length >= 2 &&
    enemyDamageComposition["physical-damage"] &&
    enemyDamageComposition["physical-damage"] > 50
  ) {
    const allAntiAdChampions = ["Malphite", "Rammus", "MonkeyKing"];
    let priorityChampions = [];
    let secondaryChampions = [];

    allAntiAdChampions.forEach((champ) => {
      if (!championTags[champ]) return;

      const champDamageTypes = championTags[champ].damageTypes;
      const fitsTeamNeeds =
        (!needsPhysical && !needsMagic) ||
        (needsPhysical && champDamageTypes.includes("physical-damage")) ||
        (needsMagic && champDamageTypes.includes("magic-damage"));

      if (fitsTeamNeeds) {
        priorityChampions.push(champ);
      } else {
        secondaryChampions.push(champ);
      }
    });

    if (priorityChampions.length > 0 || secondaryChampions.length > 0) {
      suggestions.push({
        reason: "Strong against physical damage (>50%)",
        champions: [...priorityChampions, ...secondaryChampions],
        championPriorities: [
          ...priorityChampions.map((c) => ({ name: c, priority: true })),
          ...secondaryChampions.map((c) => ({ name: c, priority: false })),
        ],
      });
    }
  }

  // Check ally team composition and suggest balance
  if (allyChampions.length >= 2) {
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

  // Display suggestions
  let html = '<div class="suggestions">';
  if (suggestions.length > 0) {
    suggestions.forEach((suggestion) => {
      if (suggestion.champions.length > 0) {
        html += `<div class="suggestion-group">
          <h4>${suggestion.reason}</h4>
          <div class="suggested-champions">`;

        if (suggestion.championPriorities) {
          // Use champion priorities to style individual champions
          suggestion.championPriorities.forEach((champ) => {
            const championClass =
              champ.priority === false ? " secondary-champion" : "";
            html += `<div class="suggested-champion${championClass}">
              <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champ.name}.png" 
                   alt="${champ.name}" class="suggested-champion-image">
            </div>`;
          });
        } else {
          // Fallback for suggestions without priorities
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

  suggestionsContent.innerHTML = html;
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
    compositionDiv.style.display = "none";
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
