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
        this.drawWall(px, py);
        break;
      case TILES.APPL:
        this.drawApple(px, py);
        break;
      case TILES.DOOR:
        this.drawDoor(px, py);
        break;
      case TILES.VANTUS:
      this.drawVantus(px, py);
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

  drawVantus(px, py) {
    // if (this.images.vantus === null) {
    //   loadImage("/assets/vantus.png", (img) => {
    //     this.images.vantus = img;
    //     image(img,px, py-4);
    //   });
    // } else {
    //   image(this.images.vantus,px, py-4);
    // }

    gAssetLoader.load(['./assets/sprites/vantus.png'], (img) => {
      image(img, px, py-4);
    });
  }

  drawWall(px, py) {
    fill(this.color.r,this.color.g,this.color.b);
    rect(px, py, this.tilesize, this.tilesize);
  }

  drawApple(px, py) {
    fill(100,200,100);
    ellipse(px+this.tilesize*0.5, py+this.tilesize*0.5, this.tilesize, this.tilesize);
  }

  drawDoor(px, py) {
    fill(this.color.r*0.75,this.color.g*0.75,this.color.b*0.75);
    rect(px, py, this.tilesize, this.tilesize);
    ellipse(px + this.tilesize*0.5, py, this.tilesize, this.tilesize);
    fill(this.color.r,this.color.g,this.color.b);
    rect(px + this.tilesize*0.6, py + this.tilesize*0.4, this.tilesize/6, this.tilesize/6);
  }
}
