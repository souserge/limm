class Wall extends Entity { // base class for walls (static objects)
  constructor(x, y, wid, hei) {
    super(x, y, wid, hei, true);
  }

  render() {
    fill(200,100,200);
    noStroke();
    rectMode(CORNER); // draw from corner
    rect(this.posX, this.posY, this.wid, this.hei);
  }
}

//export {Wall};
