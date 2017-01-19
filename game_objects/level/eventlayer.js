class Eventlayer extends TileMap {
  constructor(map, tilesize,size, offset) {
    super(map, tilesize, size, offset);
  }

  collision(x, y, w, h) {
    let leftTile = floor(x/this.tilesize) - this.offset.x;
    let rightTile = floor((x+w)/this.tilesize) - this.offset.x;
    let topTile = floor(y/this.tilesize) - this.offset.y;
    let bottomTile = floor((y+h)/this.tilesize) - this.offset.y;

    for (let i = topTile; i <= bottomTile; i++) {
      for (let j = leftTile; j <= rightTile; j++) {
        let idx = this.size.x*i+j;
        let tile = this.data[idx];
        if (tile !== 0) {
          return tile;
        }
      }  
    }
    return false;
  }
}