function getElement<T extends HTMLElement>(
  id: string,
  expectedType: new () => T
): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element ${id} not found`);
  if (!(element instanceof expectedType))
    throw new Error(`Element ${id} is not the expected type`);
  return element;
}

function loadFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameName = urlParams.get("gameName");
  const tagLine = urlParams.get("tagLine");
  const queueType = urlParams.get("queueType");
  const games = urlParams.get("games");

  if (gameName) getElement("gameName", HTMLInputElement).value = gameName;
  if (tagLine) getElement("tagLine", HTMLInputElement).value = tagLine;
  if (queueType) getElement("queueType", HTMLSelectElement).value = queueType;
  if (games) getElement("games", HTMLInputElement).value = games;

  // @ts-expect-error Still migrating
  if (gameName && tagLine) getAllStats();
}

function updateURL() {
  const gameName = getElement("gameName", HTMLInputElement).value;
  const tagLine = getElement("tagLine", HTMLInputElement).value;
  const queueType = getElement("queueType", HTMLSelectElement).value;
  const games = getElement("games", HTMLInputElement).value;

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
