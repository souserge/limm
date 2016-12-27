class Wall {
  constructor(x, y, w, h) {
    this.pos = createVector(x,y);
    this.wid = w;
    this.hei = h;
    this.isPassable = false;
  }

  render() {
    fill(200,100,200);
    noStroke();
    rectMode(CORNER);
    rect(this.pos.x, this.pos.y, this.wid, this.hei);
  }
}

//export {Wall};
