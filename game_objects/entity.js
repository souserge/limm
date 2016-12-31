class Entity {
  constructor(x, y, wid, hei, isSolid) {
    this.pos = createVector(x, y);  // position
    this.wid =   wid || 24;
    this.hei =   hei || 24;
    this.isSolid = isSolid;
  }
}
