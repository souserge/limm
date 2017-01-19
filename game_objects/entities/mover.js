;class Mover extends Entity {
  constructor(x, y, wid, hei, params) {
    super(x, y, wid, hei, true);
    this.prevPosX = this.posX;
    this.prevPosY = this.posY;
    this.velX = 0;
    this.velY = 0;
    this.isGrounded = false;
    this.moveDirX = 1;
    this.moveDirY = 1;
    this.params = params || {
      jump: Y_MOVE_SP,
      gravity: GRAVITY,
      maxVelX: X_MAX_SP,
      maxVelY: Y_MAX_SP
    }
  }

  updateVel(val) {
    this.moveX(val);
    this.moveY(val);
    this.constrainVel();
    this.checkMoveDir();
  }

  updatePos(dt, tilemap) {

    this.isGrounded = tilemap.collision(this.posX, this.posY + this.hei, this.wid, 1);
    if (tilemap.collision(this.posX + this.velX, this.posY, this.wid, this.hei)) {
      let preventer = 0;
      let xamt = Math.sign(this.velX);
      while (!tilemap.collision(this.posX + xamt, this.posY, this.wid, this.hei)) {
        this.posX += xamt;
        if (preventer++ > this.params.maxVelX) break;
      }
      this.velX = 0;
    }

    this.posX += this.velX; // THIS IS REALLY IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (tilemap.collision(this.posX, this.posY + this.velY, this.wid, this.hei)) {
      let preventer = 0;
      let yamt = Math.sign(this.velY);
      while (!tilemap.collision(this.posX, this.posY + yamt, this.wid, this.hei)) {
        this.posY += yamt;
        if (preventer++ > this.params.maxVelY) break;
      }
      this.velY = 0;
    }

    this.posY += this.velY;

  }

  constrainVel() { // constrain velocity and add dampening
    this.velY = constrain(this.velY, -Y_MAX_SP, Y_MAX_SP);
    this.velX = constrain(this.velX, -X_MAX_SP, X_MAX_SP);
  }

  checkMoveDir() {
    if (this.velX > 0) this.moveDirX = 1;
    if (this.velX < 0) this.moveDirX = -1;
    if (this.velY > 0) this.moveDirY = 1;
    if (this.velY < 0) this.moveDirY = -1;
  }

  gravity() {
    if (!this.isGrounded) {
      this.velY += this.params.gravity;
    }
  }

  moveX(val) {
    this.velX += val; //TODO
  }

  moveY(val) {
    this.velY += val; //TODO
  }
}
