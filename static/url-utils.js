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

// Load data when page loads
window.addEventListener("load", loadFromURL);

