const getGameNameElement = () => {
  const gameNameElement = document.getElementById("gameName");
  if (!gameNameElement) throw new Error("Game name element not found");
  if (!(gameNameElement instanceof HTMLInputElement))
    throw new Error("Game name element is not an input");
  return gameNameElement;
};

const getTagLineElement = () => {
  const tagLineElement = document.getElementById("tagLine");
  if (!tagLineElement) throw new Error("Tag line element not found");
  if (!(tagLineElement instanceof HTMLInputElement))
    throw new Error("Tag line element is not an input");
  return tagLineElement;
};

const getQueueTypeElement = () => {
  const queueTypeElement = document.getElementById("queueType");
  if (!queueTypeElement) throw new Error("Queue type element not found");
  if (!(queueTypeElement instanceof HTMLSelectElement))
    throw new Error("Queue type element is not a select");
  return queueTypeElement;
};

const getGamesElement = () => {
  const gamesElement = document.getElementById("games");
  if (!gamesElement) throw new Error("Games element not found");
  if (!(gamesElement instanceof HTMLInputElement))
    throw new Error("Games element is not an input");
  return gamesElement;
};

function loadFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameName = urlParams.get("gameName");
  const tagLine = urlParams.get("tagLine");
  const queueType = urlParams.get("queueType");
  const games = urlParams.get("games");

  if (gameName) getGameNameElement().value = gameName;
  if (tagLine) getTagLineElement().value = tagLine;
  if (queueType) getQueueTypeElement().value = queueType;
  if (games) getGamesElement().value = games;

  // @ts-expect-error Still migrating
  if (gameName && tagLine) getAllStats();
}

function updateURL() {
  const gameName = getGameNameElement().value;
  const tagLine = getTagLineElement().value;
  const queueType = getQueueTypeElement().value;
  const games = getGamesElement().value;

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
