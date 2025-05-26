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

    const overallWinrate = ((data.totalWins / data.totalGames) * 100).toFixed(1);
    
    let html = `
      <h3>Overall Winrate</h3>
      <p>${data.totalWins}/${data.totalGames} (${overallWinrate}%)</p>
      
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

