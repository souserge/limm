function getTileMap(tmapID) {
  if (gameLevels.has(tmapID)) {
    return gameLevels.get(tmapID);
  } else {
    return null;
  }
}