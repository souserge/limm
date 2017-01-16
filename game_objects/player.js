class Player extends Mover {
  constructor(x, y, wid, hei) {
    let params = {
      jump: Y_MOVE_SP,
      gravity: GRAVITY,
      maxVelX: X_MAX_SP,
      maxVelY: Y_MAX_SP
    }
    super(x, y, wid, hei, params);
  }

  jump(input) {
    if (input.jump.down) {
      if (this.isGrounded && input.jump.pressed) {
        this.velY -= Y_MOVE_SP;
        this.isGrounded = false;
      }
    } else if (this.velY < 0) {
      this.velY *= 0.9;
    }
  }

  moveX(input) {
    let mult = 0;
    if (input.left.down) {
      this.heading = -1;
      mult--;
    }
    if (input.right.down) {
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

  moveY(input) {
    this.jump(input);
    this.gravity();
  }

  render(lag) {
    let rposX = this.posX + this.velX*lag;
    let rposY = this.posY + this.velY*lag;
    fill(250,200,150);
    noStroke();
    rect(rposX, rposY, this.wid, this.hei);
    triangle(rposX, rposY, rposX + this.wid/8, rposY - this.hei/2, rposX + this.wid/3, rposY+1);
    triangle(rposX + 2*this.wid/3, rposY+1, rposX + 7*this.wid/8, rposY - this.hei/2, rposX + this.wid, rposY);
    fill(50,150,50);
    rect(rposX + this.wid/6, rposY + 2*this.hei/6, this.wid/6, this.hei/6);
    rect(rposX + 4*this.wid/6, rposY + 2*this.hei/6, this.wid/6, this.hei/6);
  }

}