class Entity {
  constructor(x, y, wid, hei, isSolid) {
    this.posX = x;
    this.posY = y;
    this.wid =   wid || 16;
    this.hei =   hei || 16;
    this.isSolid = isSolid;
    this.killed = false;
  }
}
