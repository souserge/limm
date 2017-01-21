class Level {
    constructor(levelId, tilelayerData, eventlayerData, entitiesData, tilesize, wid, hei, xoff, yoff, cr, cg, cb, playerSpawn) {
        this.id = levelId || "noid";
        this.tilesize = tilesize || 16;

        this.size = {
            x: wid || 32,
            y: hei || 32
        }
        this.offset = {
            x: xoff || 0,
            y: yoff || 0
        }

        this.color = {
            r: cr || 200,
            g: cg || 50,
            b: cb || 100
        }

        this.pixelSize = {
          x: this.size.x*this.tilesize,
          y: this.size.y*this.tilesize
        }

        this.pixelOffset = {
          x: this.offset.x*this.tilesize,
          y: this.offset.y*this.tilesize
        }

        this.tilelayer = new Tilelayer(tilelayerData, this.tilesize, this.size, this.offset, this.color);
        this.eventlayer = new Eventlayer(eventlayerData, this.tilesize, this.size, this.offset);
        this.entities = entitiesData || [];
        this.playerSpawn = playerSpawn || {value:false};
    }

    checkActiveCollision(mover) {
      let tiles = this.tilelayer.onTiles(mover.posX, mover.posY, mover.wid, mover.hei);

      for (let tile of tiles) {
        if (this.tilelayer.data[tile] === TILES.VANTUS) {
          mover.killed = true;
        }
      }
    }

    wallCollision(x, y, w, h) {
      if (arguments.length == 2) {
        return this.tilelayer.pointCollision(x,y);
      }
      return this.tilelayer.collision(x, y, w, h);
    }

    render() {
        background(this.color.r*0.5, this.color.g*0.5, this.color.b*0.5);
        this.tilelayer.renderMap();
    }
}
