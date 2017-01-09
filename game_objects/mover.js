class Mover extends Entity {
  constructor(x, y, wid, hei, params) {
    super(x, y, wid, hei, true);
    this.velX = 0;
    this.velY = 0;
    this.isGrounded = false;
    this.headX = 1;
    this.params = params || {
      jump: Y_MOVE_SP,
      gravity: GRAVITY,
      maxVelX: X_MAX_SP,
      maxVelY: Y_MAX_SP
    }
  }

  updateVel() {
    this.moveX();
    this.moveY();
    this.constrainVel();
  }

  updatePos(dt) {
    this.posX += this.velX;
    this.posY += this.velY;
  }

  constrainVel() { // constrain velocity and add dampening
    this.velY = constrain(this.velY, -Y_MAX_SP, Y_MAX_SP);
    this.velX = constrain(this.velX, -X_MAX_SP, X_MAX_SP);
  }

  gravity() {
    if (!this.isGrounded) {
      this.velY += this.params.gravity;
    }
  }

  moveX() {
    this.velX += 1 //TODO
  }

  moveY() {
    this.velY += 1; //TODO
  }
}
