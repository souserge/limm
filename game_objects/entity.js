class Entity {
  constructor(x, y, wid, hei, isSolid) {
    this.posX = x;
    this.posY = y;
    this.wid =   wid || 24;
    this.hei =   hei || 24;
    this.isSolid = isSolid;
  }
}
