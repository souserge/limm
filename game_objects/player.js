class Player extends Mover {
  constructor(x, y, wid, hei) {
    let params = {
      jump: Y_MOVE_SP,
      gravity: GRAVITY,
      maxVelX: X_MAX_SP,
      maxVelY: Y_MAX_SP
    }
    super(x, y, wid, hei, params);
    this.input = {up: false, down: false, right: false, left: false}
  }

  updateVel() {
    super.updateVel();
  }

  updatePos(dt) {
    super.updatePos(dt);
  }

  constrainVel() {
    super.constrainVel();
  }

  gravity() {
    super.gravity();
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

  moveX() {
    let mult = 0;
    if (this.input.left) {
      this.heading = -1;
      mult--;
    }
    if (this.input.right) {
      this.heading = 1;
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
    this.gravity();
  }

  keyCheck() {
    this.input.left = keyIsDown(LEFT_ARROW);
    this.input.right = keyIsDown(RIGHT_ARROW);
    this.input.up = keyIsDown(UP_ARROW);
  }

  render() {
    fill(255);
    noStroke();
    rect(this.posX, this.posY, this.wid, this.hei);
  }

}