let toolbar = {
    div: null,
    save: null,
    mode: null,
    tilepos: null,
    draw: function() {
      this.mode.html("Mode: " + flags.mode);
      this.currLayer.html("Layer: " + flags.currLayer);
      let currTile = getCurrTile();
      this.tilepos.html('Tile: ID: ' + flags.currObj + "; Pos: " + currTile.x + ', ' + currTile.y);
    },
    init: function() {
      this.div = createDiv('Toolbar'),
      this.save = createButton('Save'),
      this.mode = createP("Mode: " + "none"),
      this.currLayer = createP("Layer: " + "none"),
      this.tilepos = createP('Tile: ID:' + 'none' + "; Pos: " + '-' + ', ' + '-'),

      this.save.id("btn-save");
      $("#btn-save").on('click', function() {
      let text = JSON.stringify(level, null, 2);
      let filename = level.id;
      let blob = new Blob([text], {type: "application/json"});
      saveAs(blob, filename + ".js");
      });
      this.div.child(this.tilepos);
      this.div.child(this.mode);
      this.div.child(this.currLayer);
      this.div.child(this.save);

      this.div.hide();
    }
};