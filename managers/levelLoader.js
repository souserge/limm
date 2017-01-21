class LevelLoader {
  constructor() {
    this.cached = new Map();
  }

  get(relPath, callback) {
    let path = "./levels/" + relPath + '.json';

    if (this.cached.has(path)) {
      let level = this.cached.get(path);
      callback(level);
      return level;
    }

    xhrGet(path, (data) => {
      //console.log(data.responseText);
      this.parseLevelJSON(path, data.responseText, callback);
    });
  }

  parseLevelJSON(path, json, callback) {
    //console.log('Path: ' + path + ';Json: ' + json);
    let ldata = JSON.parse(json);

    let entities = [];
    for (let ent of ldata.entities) {
      entities.push(this.convertEntities(ent));
    }

    let level = new Level (
      ldata.id,
      ldata.tilelayer.data,
      ldata.eventlayer.data,
      entities,
      ldata.tilesize,
      ldata.size.x, ldata.size.y,
      ldata.offset.x, ldata.offset.y,
      ldata.color.r, ldata.color.g, ldata.color.b,
      ldata.playerSpawn
    );
    this.cached.set(path, level);
    callback(level);
  }

  convertEntities(ent) {
    let mover = null;
    switch(ent.type) {
    case EVENTS.SPAWN.CRABOCOP:
      mover = new Crabocop(ent.data.px, ent.data.py, ent.data.dir);
    }
    return mover;
  }
}

let gLevelLoader = new LevelLoader();
