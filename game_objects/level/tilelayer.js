class Tilelayer extends TileMap {
  constructor(map, tilesize,size, offset, color) {
      super(map, tilesize, size, offset);

      this.color =  color || {
          r: 0,
          g: 0,
          b: 0
      }
      this.images = {
        vantus: null
      }
  }

  renderMap() {
    for (let i = 0; i < this.size.y; i++) {
      for (let j = 0; j < this.size.x; j++) {
        let idx = this.size.x*i+j;
        if (this.data[idx] !== 0) {
          this.renderTile(this.data[idx], j + this.offset.x, i + this.offset.y);
        }
      }
    }
  }

  renderTile(tileID, x, y) {

      let px = x*this.tilesize;
      let py = y*this.tilesize;

      rectMode(CORNER);
      noStroke();

      switch(tileID) {
      case TILES.WALL:
        gDrawHelper.wall(px, py, this.tilesize, this.color);
        break;
      case TILES.DOOR:
        gDrawHelper.door(px, py, this.tilesize, this.color);
        break;
      case TILES.VANTUS:
      gDrawHelper.vantus(px, py);
      }
  }
}
