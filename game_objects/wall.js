class Wall { // base class for walls (static objects)
  constructor(x, y, w, h) {
    this.pos = createVector(x,y);
    this.wid = w;
    this.hei = h;
    //this.isPassable = false; // not used for now
  }

  render() {
    fill(200,100,200);
    noStroke();
    rectMode(CORNER); // draw from corner
    rect(this.pos.x, this.pos.y, this.wid, this.hei);
  }
}

//export {Wall};
