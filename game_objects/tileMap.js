class TileMap {
  constructor(map) {
    this.data = map;
    this.tsize = TSIZE;
    this.size = {
        x: COLS,
        y: ROWS
    }
  }

  renderMap() {
    for (let i = 0; i < this.size.y; i++) {
      for (let j = 0; j < this.size.x; j++) {
        let idx = this.size.x*i+j;
        if (this.data[idx] != 0) {
          this.renderTile(this.data[idx], j, i);
        }
      }
    }
  }

  collision(x, y, w, h) {
    x = floor(x);
    y = floor(y);
    let leftTile = floor(x/this.tsize);
    let rightTile = floor((x+w)/this.tsize);
    let topTile = floor(y/this.tsize);
    let bottomTile = floor((y+h)/this.tsize);

    for (let i = topTile; i <= bottomTile; i++) {
      for (let j = leftTile; j <= rightTile; j++) {
        let idx = this.size.x*i+j;
        if (this.data[idx] != 0) {
          return true;
        }
      }  
    }
    return false;
  }

  renderTile(tileID, x, y) {
      let px = x*this.tsize;
      let py = y*this.tsize;
      
      rectMode(CORNER);
      noStroke();
      switch(tileID) {
      case TILE_WALL:
        fill(200,100,200);
        rect(px, py, this.tsize, this.tsize);
        break;
      case TILE_APPL:
        fill(100,200,100);
        ellipse(px+this.tsize*0.5, py+this.tsize*0.5, this.tsize, this.tsize);
        break;
      case TILE_BANA:
        break;
      case TILE_VACU:
        break;
      case TILE_BALL:
        break;
      case TILE_WATE:
        break;
      }
  }
}