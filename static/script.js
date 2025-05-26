function loadFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameName = urlParams.get("gameName");
  const tagLine = urlParams.get("tagLine");
  const queueType = urlParams.get("queueType");
  const games = urlParams.get("games");

  if (gameName) document.getElementById("gameName").value = gameName;
  if (tagLine) document.getElementById("tagLine").value = tagLine;
  if (queueType) document.getElementById("queueType").value = queueType;
  if (games) document.getElementById("games").value = games;

  if (gameName && tagLine) getAllStats();
}

// Update URL when form changes
function updateURL() {
  const gameName = document.getElementById("gameName").value;
  const tagLine = document.getElementById("tagLine").value;
  const queueType = document.getElementById("queueType").value;
  const games = document.getElementById("games").value;

  if (gameName && tagLine) {
    const params = new URLSearchParams();
    params.set("gameName", gameName);
    params.set("tagLine", tagLine);
    if (queueType !== "-1") params.set("queueType", queueType);
    if (games !== "100") params.set("games", games);

    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newURL);
  }
}

async function getAllStats(event) {
  if (event) event.preventDefault();

  const gameName = document.getElementById("gameName").value;
  const tagLine = document.getElementById("tagLine").value;
  const queueType = document.getElementById("queueType").value;
  const games = document.getElementById("games").value;

  updateURL();

  document.getElementById("results").innerHTML = "<p>Loading...</p>";

  try {
    // Fetch combined stats from single endpoint
    const response = await fetch(
      `/api/stats?gameName=${gameName}&tagLine=${tagLine}&queueType=${queueType}&games=${games}`,
    );

    if (response.status !== 200) {
      const text = await response.text();
      throw new Error(response.statusText + " | " + text);
    }

    const data = await response.json();

    let html = `
      <h3>Overall Winrate</h3>
      <p>${data.winrate}%</p>
      
      <div class="stats-columns">
        <div class="stats-column">
          <h3>Champion Winrates</h3>
    `;

    data.championWinrates.forEach((champion) => {
      const winrate = ((champion.Wins / champion.Games) * 100).toFixed(1);
      html += `
          <div class="champion">
            <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.ChampionName}.png" 
                 alt="${champion.ChampionName}" class="champion-icon" 
                 onerror="this.style.display='none'">
            <div>
              <strong>${champion.ChampionName}</strong>: 
              ${champion.Wins}/${champion.Games} (${winrate}%)
            </div>
          </div>
      `;
    });

    html += `
        </div>
        <div class="stats-column">
          <h3>Winrate vs Enemy Champion</h3>
    `;

    data.enemyWinrates.forEach((result) => {
      const winrate = ((result.Wins / result.Games) * 100).toFixed(1);
      html += `
          <div class="champion">
            <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${result.ChampionName}.png" 
                 alt="${result.ChampionName}" class="champion-icon" 
                 onerror="this.style.display='none'">
            <div>
              <strong>vs ${result.ChampionName}</strong>: 
              ${result.Wins}/${result.Games} wins (${winrate}%)
            </div>
          </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    document.getElementById("results").innerHTML = html;
  } catch (error) {
    document.getElementById("results").innerHTML =
      `<p>Error: ${error.message}</p>`;
  }
}

// Load data when page loads
window.addEventListener("load", loadFromURL);