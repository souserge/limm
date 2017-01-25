;class Mover extends Entity {
  constructor(x, y, wid, hei, params) {
    super(x, y, wid, hei, true);
    this.prevPosX = this.posX;
    this.prevPosY = this.posY;
    this.velX = 0;
    this.velY = 0;
    this.isGrounded = false;
    this.params = params || {
      jump: Y_MOVE_SP,
      gravity: GRAVITY,
      maxVelX: X_MAX_SP,
      maxVelY: Y_MAX_SP
    }
    // this.dirX = 0;
    // this.dirY = 0;
  }

  updateVel() {
    this.moveX();
    this.moveY();
    this.constrainVel();
  }

  updatePos(dt) {
    this.prevPosX = this.posX;
    this.prevPosY = this.posY;

    this.isGrounded = gGameSystem.level.wallCollision(this.posX, this.posY + this.hei, this.wid, 1);
    if (gGameSystem.level.wallCollision(this.posX + this.velX, this.posY, this.wid, this.hei)) {
      let preventer = 0;
      let xamt = Math.sign(this.velX);
      while (!gGameSystem.level.wallCollision(this.posX + xamt, this.posY, this.wid, this.hei)) {
        this.posX += xamt;
        if (preventer++ > this.params.maxVelX) break;
      }
      this.velX = 0;
    }

    this.posX += this.velX; // THIS IS REALLY IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (gGameSystem.level.wallCollision(this.posX, this.posY + this.velY, this.wid, this.hei)) {
      let preventer = 0;
      let yamt = Math.sign(this.velY);
      while (!gGameSystem.level.wallCollision(this.posX, this.posY + yamt, this.wid, this.hei)) {
        this.posY += yamt;
        if (preventer++ > this.params.maxVelY) break;
      }
      this.velY = 0;
    }

    this.posY += this.velY;

  }

  update(dt) {
    this.updateVel();
    this.updatePos(dt);
  }

  constrainVel() { // constrain velocity and add dampening
    this.velY = constrain(this.velY, -this.params.maxVelY, this.params.maxVelY);
    this.velX = constrain(this.velX, -this.params.maxVelX, this.params.maxVelX);
  }

  gravity() {
    if (!this.isGrounded) {
      this.velY += this.params.gravity;
    }
  }

  moveX() {

  }

  moveY() {
    this.gravity();
  }

  render() {

  }
}
