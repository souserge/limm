let toolbar = {
    div: null,
    uglify: null,
    save: null,
    mode: null,
    tilepos: null,
    draw: function() {
      let modeName = getModeName(flags.mode);
      this.mode.html("Mode: " + modeName);
      this.currLayer.html("Layer: " + flags.currLayer);
      let tileName = getTileName(flags.currObj, flags.mode);
      let tilePos = getCurrTilePos();
      this.tilepos.html('Tile: ' + tileName + "; Pos: " + tilePos.x + ', ' + tilePos.y);
    },
    init: function() {
      this.div = createDiv('Toolbar'),
      this.save = createButton('Save'),
      this.uglify = createCheckbox('Uglify', false);
      this.mode = createP("Mode: " + "none"),
      this.currLayer = createP("Layer: " + "none"),
      this.tilepos = createP('Tile: ' + 'none' + "; Pos: " + '-' + ', ' + '-'),

      this.save.id("btn-save");
      $("#btn-save").on('click', function() {
        let space = this.uglify.checked() ? undefined : 2;
        let text = JSON.stringify(level, null, space);
        let filename = level.id;
        let blob = new Blob([text], {type: "application/json"});
        saveAs(blob, filename + ".json");
      });
      this.div.child(this.tilepos);
      this.div.child(this.mode);
      this.div.child(this.currLayer);
      this.div.child(this.uglify);
      this.div.child(this.save);

      this.div.hide();
    }
};

function getTileName(id, mode) {
  switch (mode) {
  case MODE.DRAW:
    switch (id) {
    case TILES.WALL:
      return "Wall";
    case TILES.DOOR:
      return "Door";
    case TILES.VANTUS:
      return "Plunger";
    default:
      return "None";
    }
  case MODE.EVENT:
    switch (id) {
    case EVENTS.TELEPORT:
      return "Teleport";
    case EVENTS.SPAWN.CRABOCOP:
      return "Crabocop";
    default:
      return "None";
    }
  default:
    return "None";
  }
}

function getModeName(id) {
  switch (id) {
  case MODE.DRAW:
    return "Draw Tiles";
  case MODE.EVENT:
    return "Place Events";
  }
}

function jsFriendlyJSONStringify(s) {
    return JSON.stringify(s).
        replace(/\u2028/g, '\\u2028').
        replace(/\u2029/g, '\\u2029');
}
