let ui = {
  "div": null,
  "start": null,
  "load": null,
  "id": null,
  "tilesize": null,
  "viewSize": {
    "x": null,
    "y": null
  },
  "size": {
    "x": null,
    "y": null
  },
  "offset": {
    "x": null,
    "y": null
  },
  "color": {
    "r": null,
    "g": null,
    "b": null,
    "show": null,
    update: function() {
      this.show.style("background-color", color(this.r.value()*0.5,this.g.value()*0.5,this.b.value()*0.5));
      this.show.style("color", color(this.r.value(),this.g.value(),this.b.value()));
    }
  },
  init: function() {
    this.div = createDiv('Settings');

    this.div.child(createElement( 'label', '<br>Level id:'));
    this.id = createInput(level.id);
    this.div.child(this.id);

    this.div.child(createElement( 'label', '<br><br>tilesize:'));
    this.tilesize = createInput(level.tilesize);
    this.div.child(this.tilesize);

    this.div.child(createElement( 'label', '<br><br>view (screen) size (x, y):'));
    this.viewSize.x = createInput(level.viewSize.x);
    this.viewSize.y = createInput(level.viewSize.y);
    this.div.child(this.viewSize.x);
    this.div.child(this.viewSize.y);

    this.div.child(createElement( 'label', '<br><br>size (x, y):'));
    this.size.x = createInput(level.size.x);
    this.size.y = createInput(level.size.y);
    this.div.child(this.size.x);
    this.div.child(this.size.y);

    this.div.child(createElement( 'label', '<br><br>offset (x, y):'));
    this.offset.x = createInput(level.offset.x);
    this.offset.y = createInput(level.offset.y);
    this.div.child(this.offset.x);
    this.div.child(this.offset.y);

    this.color.show = createElement( 'label', '<br><br>color (r, g, b):');
    this.color.r = createInput(level.color.r);
    this.color.g = createInput(level.color.g);
    this.color.b = createInput(level.color.b);
    this.div.child(this.color.show);
    this.div.child(this.color.r);
    this.div.child(this.color.g);
    this.div.child(this.color.b);

    this.div.child(createElement( 'label', '<br><br>'));
    this.start = createButton("start");
    this.start.mousePressed(() => createLevel());
    this.div.child(this.start);

    this.div.child(createElement( 'label', '<br>Or load a file:'));
    this.load = createElement("input");
    this.load.attribute("type", "file");
    this.load.attribute("name", "files");
    this.load.attribute("id", "load-file");
    gFileManager.readAsJSON("load-file", (evt) => {
      let result = evt.target.result;
      let parsedRes = JSON.parse(result);
      createLevel(parsedRes);
    });

    this.div.child(this.load);

    this.div.hide();
  }
};
