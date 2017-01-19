class LevelLoader {
  constructor() {
    this.cached = new Map();
  }

  get(path, callback) {

    if (this.cached.has(path)) {
      let level = this.cached.get(path);
      callback(level);
      return level;
    }

    xhrGet(path, (data) => {
      this.parseLevelJSON(path, data.responseText, callback);
    });
  }

  parseLevelJSON(path, json, callback) {
    let ldata = JSON.parse(json);

    let level = new level (
      ldata.id,
      ldata.tilelayer.data,
      ldata.eventlayer.data,
      ldata.entitylayer.data,
      ldata.tilesize,
      ldata.size.x, ldata.size.y,
      ldata.offset.x, ldata.offset.y,
      ldata.color.r, ldata.color.g, ldata.color.b
    );
    this.cached.set(path, level);
    callback(level);
  }
}

let gLevelLoader = new LevelLoader();
