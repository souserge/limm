class Tilelayer extends TileMap {
  constructor(map, tilesize,size, offset, color) {
      super(map, tilesize, size, offset);

      this.color =  color || {
          r: 0,
          g: 0, 
          b: 0
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
        fill(this.color.r,this.color.g,this.color.b);
        rect(px, py, this.tilesize, this.tilesize);
        break;
      case TILES.APPL:
        fill(100,200,100);
        ellipse(px+this.tilesize*0.5, py+this.tilesize*0.5, this.tilesize, this.tilesize);
        break;
      case TILES.DOOR:
        fill(this.color.r*0.75,this.color.g*0.75,this.color.b*0.75);
        rect(px, py, this.tilesize, this.tilesize);
        ellipse(px + this.tilesize*0.5, py, this.tilesize, this.tilesize);
        fill(this.color.r,this.color.g,this.color.b);
        rect(px + this.tilesize*0.6, py + this.tilesize*0.4, this.tilesize/6, this.tilesize/6);
        break;
      case TILES.BANANA:
        break;
      case TILES.VACUUM:
        break;
      case TILES.BALLOON:
        break;
      case TILES.WATER:
        break;
      }
  }
}