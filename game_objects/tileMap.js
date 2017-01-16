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

  collisionBottom(x, y, w, h) {
    let leftTile = floor(x/this.tilesize) - this.offset.x;
    let rightTile = floor((x+w)/this.tilesize) - this.offset.x;
    let idx = (floor((y+h)/this.tilesize) - this.offset.y)*this.size.x + leftTile;

    for (let j = leftTile; j <= rightTile; j++) {
      if(this.data[idx] > 0) return  true;
      ++idx;
    }
    return false;
  }

  collisionTop(x, y, w, h) {
    let leftTile = floor(x/this.tilesize) - this.offset.x;
    let rightTile = floor((x+w)/this.tilesize) - this.offset.x;
    let idx = (floor((y)/this.tilesize) - this.offset.y)*this.size.x + leftTile;

    for (let j = leftTile; j <= rightTile; j++) {
      if (this.data[idx] > 0) return true;
      idx += 1;
    }
    return false;
  }

  collisionLeft(x, y, w, h) {
    let topTile = floor(y/this.tilesize) - this.offset.y;
    let bottomTile = floor((y+h)/this.tilesize) - this.offset.y;
    let idx = floor((x)/this.tilesize) - this.offset.x + topTile*this.size.x;

     for (let i = topTile; i <= bottomTile; i++) {
        if (this.data[idx] > 0) return true;
        idx += this.size.x;
    }
    return false;
  }

  collisionRight(x, y, w, h) {
    let topTile = floor(y/this.tilesize) - this.offset.y;
    let bottomTile = floor((y+h)/this.tilesize) - this.offset.y;
    let idx = floor((x+w)/this.tilesize) - this.offset.x + topTile*this.size.x;

     for (let i = topTile; i <= bottomTile; i++) {
        if (this.data[idx] > 0) return true;
        idx += this.size.x;
    }
    return false;
  }
}