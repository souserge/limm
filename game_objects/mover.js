class Mover extends Entity {
  constructor(x, y, wid, hei) {
    super(x, y, wid, hei, true);
    this.velX = 0;
    this.velY = 0;
    this.isGrounded = false;
    this.input = {up: false, down: false, right: false, left: false}
  }

  updateVel(dt) {
    this.keyCheck();

    this.gravity();
    this.moveX();
    this.moveY();
    this.applyFriction();
  }

  updatePos() {
    this.posX += this.velX;
    this.posY += this.velY;
  }


  keyCheck() {
    this.input.left = keyIsDown(LEFT_ARROW);
    this.input.right = keyIsDown(RIGHT_ARROW);
    this.input.up = keyIsDown(UP_ARROW);
  }

  applyFriction() { // constrain velocity and add dampening
    if (!this.isGrounded) {
      this.velY = constrain(this.velY, -Y_MAX_SP, Y_MAX_SP);
    }
    this.velX = constrain(this.velX, -X_MAX_SP, X_MAX_SP);
  }

  jump() {
    if (this.input.up) {
      if (this.isGrounded) {
        this.velY -= Y_MOVE_SP;
        this.isGrounded = false;
      }
    } else if (this.velY < 0) {
      this.velY *= 0.9;
    }
  }

  gravity() {
    this.velY += GRAVITY;
  }

  moveX() {
    let mult = 0;
    if (this.input.left) {
      mult--;
    }
    if (this.input.right) {
      mult++;
    }

    if (!this.isGrounded) {
      mult *= X_AIR_MOVE_SP;
    } else if (mult == 0) {
       this.velX *= WALL_FRICTION;
    }

    this.velX += mult*X_MOVE_SP;
  }

  moveY() {
    this.jump();
    if (!this.isGrounded) {
      this.gravity();
    }
  }

  render() {
    fill(255);
    noStroke();
    rect(this.posX, this.posY, this.wid, this.hei);
  }
}
