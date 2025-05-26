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

  selector.onclick = () => openChampionModal(selector);
  return selector;
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
  const selectors = document.querySelectorAll(".champion-selector");
  const modal = document.getElementById("championModal");
  const closeBtn = document.getElementById("closeModal");
  const searchInput = document.getElementById("championSearch");

  selectors.forEach((selector) => {
    selector.onclick = () => openChampionModal(selector);
  });

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

window.addEventListener("load", initChampionSelector);
