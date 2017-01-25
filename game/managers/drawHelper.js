class DrawHelper {
  constructor() {
    this.prePath = '/';
  }

  setAppendingPath(path) {
    this.prePath = path;
  }

  vantus(px, py) {
    gAssetLoader.load([this.prePath + 'assets/sprites/vantus.png'], (img) => {
      image(img, px, py-4);
    });
  }

  wall(px, py, tsize, color) {
    fill(color.r, color.g, color.b);
    rect(px, py, tsize, tsize);
  }

  door(px, py, tsize, color) {
    fill(color.r*0.75,color.g*0.75,color.b*0.75);
    rect(px, py, tsize, tsize);
    ellipse(px + tsize*0.5, py, tsize, tsize);
    fill(color.r,color.g,color.b);
    rect(px + tsize*0.6, py + tsize*0.4, tsize/6, tsize/6);
  }

  player(px, py) {
    gAssetLoader.load([this.prePath + 'assets/sprites/player.png'], (img) => {
      image(img, px-2, py-4);
    });
  }

  crabocop(px, py) {
    gAssetLoader.load([this.prePath + "assets/sprites/crabocop.png"], (img) => {
      image(img, px-2, py-4);
    });
  }

  // door(px, py) { // TODO
  //
  // }
}

let gDrawHelper = new DrawHelper();
