class TileMap {
  constructor(map, tilesize, size, offset) {
    this.data = map;
    this.tilesize = tilesize;
    this.size =  size || {
      x: COLS,
      y: ROWS
    }
    this.offset =  offset || {
      x: 0,
      y: 0
    }
  }

  onTiles(x,y,w,h) {
    let leftTile = floor(x/this.tilesize) - this.offset.x;
    let rightTile = floor((x+w)/this.tilesize) - this.offset.x;
    let topTile = floor(y/this.tilesize) - this.offset.y;
    let bottomTile = floor((y+h)/this.tilesize) - this.offset.y;
    let retn = [];

    for (let i = topTile; i <= bottomTile; i++) {
      for (let j = leftTile; j <= rightTile; j++) {
        let idx = this.size.x*i+j;
        retn.push(idx);
      }
    }
    return retn;
  }

  collision(x, y, w, h) {
    let leftTile = floor(x/this.tilesize) - this.offset.x;
    let rightTile = floor((x+w)/this.tilesize) - this.offset.x;
    let topTile = floor(y/this.tilesize) - this.offset.y;
    let bottomTile = floor((y+h)/this.tilesize) - this.offset.y;

    for (let i = topTile; i <= bottomTile; i++) {
      for (let j = leftTile; j <= rightTile; j++) {
        let idx = this.size.x*i+j;
        if (this.data[idx] > 0) return true;
      }
    }
    return false;
  }

  pointCollision(x, y) {
    let j = floor(x/this.tilesize) - this.offset.x;
    let i = floor(y/this.tilesize) - this.offset.y;

    if (this.data[this.size.x*i+j] > 0) return true;

    return false;
  }
}
