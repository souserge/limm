let toolbar = {
    div: null,
    uglify: null,
    save: null,
    mode: null,
    tilepos: null,
    playerSpawn: {
      div: null,
      value: null,
      tx: null,
      ty: null
    },
    draw: function() {
      let modeName = getModeName(flags.mode);
      let dragging = flags.dragging ? '; Drag on' : '';
      this.mode.html("Mode: " + modeName + dragging);
      this.currLayer.html("Layer: " + flags.currLayer);
      let tileName = getTileName(flags.currObj, flags.mode);
      let tilePos = getTilePos(mouseX, mouseY);
      let tpx = tilePos.x !== null ? tilePos.x : '-';
      let tpy = tilePos.y !== null ? tilePos.y : '-';
      this.tilepos.html('Tile: ' + tileName + "; Pos(X, Y): " + tpx + ', ' + tpy);
      if (this.playerSpawn.value.checked()) {
        level.playerSpawn.value = true;
        level.playerSpawn.tx = parseInt(this.playerSpawn.tx.value());
        level.playerSpawn.ty = parseInt(this.playerSpawn.ty.value());
        this.playerSpawn.div.show();
      } else {
        this.playerSpawn.div.hide();
        level.playerSpawn.value = false;
      }
    },
    init: function() {
      this.div = createDiv('Toolbar'),
      this.save = createButton('Save'),
      this.uglify = createCheckbox('Uglify', false);
      this.playerSpawn.value = createCheckbox('Player spawn?', false);
      this.playerSpawn.div = createDiv('');
      this.playerSpawn.tx = createInput(-1);
      this.playerSpawn.ty = createInput(-1);

      this.mode = createP("Mode: " + "none"),
      this.currLayer = createP("Layer: " + "none"),
      this.tilepos = createP('Tile: ' + 'none' + "; Pos: " + '-' + ', ' + '-'),

      this.save.id("btn-save");
      $("#btn-save").on('click', function() {
        let space = toolbar.uglify.checked() ? undefined : 2;
        let text = JSON.stringify(level, null, space);
        filename = level.id.split('/');
        gFileManager.saveAsJSON(filename[filename.length-1], text);
      });

      this.playerSpawn.div.child(createElement( 'label', '<br>Tile X pos:'));
      this.playerSpawn.div.child(this.playerSpawn.tx);
      this.playerSpawn.div.child(createElement( 'label', '<br>Tile Y pos:'));
      this.playerSpawn.div.child(this.playerSpawn.ty);

      this.div.child(this.tilepos);
      this.div.child(this.mode);
      this.div.child(this.currLayer);
      this.div.child(this.playerSpawn.value);
      this.div.child(this.playerSpawn.div);
      this.div.child(this.uglify);
      this.div.child(this.save);

      this.div.hide();
      this.playerSpawn.div.hide();
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
