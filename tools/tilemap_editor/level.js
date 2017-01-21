let level = {
  "id": "RM_01",
  "tilesize": 16,
  "viewSize": {
    "x": 45,
    "y": 30
  },
  "size": {
    "x": 49,
    "y": 34
  },
  "offset": {
    "x": -2,
    "y": -2
  },
  "color": {
    "r": 200,
    "g": 100,
    "b": 200
  },
  "tilelayer": {
    "data": []
  },

  "eventlayer": {
    "data": []
  },

  "entities": [],
  "playerSpawn": {
    "value": false,
    "tx": -1,
    "ty": -1
  }
};

function createLevel(obj) {
  flags.started = true;
  flags.editing = true;
  flags.currLayer = "tilelayer";
  flags.currObj = TILES.WALL;
  flags.mode = MODE.DRAW;

  if (obj) {
    level = obj;
  } else {
    level.id = ui.id.value();
    level.tilesize = parseInt(ui.tilesize.value());
    level.viewSize = {
        "x": parseInt(ui.viewSize.x.value()),
        "y": parseInt(ui.viewSize.y.value())
      };
    level.size = {
        "x": parseInt(ui.size.x.value()),
        "y": parseInt(ui.size.y.value())
      };
    level.offset = {
        "x": parseInt(ui.offset.x.value()),
        "y": parseInt(ui.offset.y.value())
      };
    level.color = {
        "r": parseInt(ui.color.r.value()),
        "g": parseInt(ui.color.g.value()),
        "b": parseInt(ui.color.b.value())
      };
    for (let i = 0; i < level.size.y; i++) {
      for (let j = 0; j < level.size.x; j++) {
        level.tilelayer.data.push(0);
        level.eventlayer.data.push(0);
      }
    }
  }

  resizeCanvas(level.size.x*level.tilesize, level.size.y*level.tilesize);
  pxoff = level.offset.x*level.tilesize;
  pyoff = level.offset.y*level.tilesize;


  ui.div.hide();
  createEventToolbar();
  toolbar.div.show();
}
