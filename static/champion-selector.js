let champions = [];
let currentSelector = null;

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

  filteredChampions.forEach((champion) => {
    const item = document.createElement("div");
    item.className = "champion-grid-item";
    item.onclick = () => selectChampion(champion);

    item.innerHTML = `
      <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png" 
           alt="${champion.name}" class="champion-grid-image"
           onerror="this.style.display='none'">
      <div class="champion-grid-name">${champion.name}</div>
    `;

    grid.appendChild(item);
  });
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

  closeChampionModal();
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
  renderChampionGrid();
}

function initChampionSelector() {
  const selectors = document.querySelectorAll(".champion-selector");
  const modal = document.getElementById("championModal");
  const closeBtn = document.getElementById("closeModal");
  const searchInput = document.getElementById("championSearch");

  selectors.forEach(selector => {
    selector.onclick = () => openChampionModal(selector);
  });

  closeBtn.onclick = closeChampionModal;

  modal.onclick = (event) => {
    if (event.target === modal) closeChampionModal();
  };

  searchInput.oninput = (event) => {
    renderChampionGrid(event.target.value);
  };

  loadChampions();
}

window.addEventListener("load", initChampionSelector);

