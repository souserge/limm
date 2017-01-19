const PLAYER = {
  WID: 16,
  HEI: 16
}

class Player extends Mover {
  constructor(x, y) {
    let params = {
      jump: Y_MOVE_SP,
      gravity: GRAVITY,
      maxVelX: X_MAX_SP,
      maxVelY: Y_MAX_SP
    }
    super(x, y, PLAYER.WID, PLAYER.HEI, params);
  }

  jump() {
    if (gGameSystem.input.jump.down) {
      if (this.isGrounded && gGameSystem.input.jump.pressed) {
        this.velY -= Y_MOVE_SP;
        this.isGrounded = false;
        gAssetLoader.load(["./assets/sfx/player_jump.wav"], (snd) => {
          snd.playMode('restart');
          snd.play();
        });
      }
    } else if (this.velY < 0) {
      this.velY *= 0.9;
    }
  }

  moveX() {
    let mult = 0;
    if (gGameSystem.input.left.down) {
      this.heading = -1;
      mult--;
    }
    if (gGameSystem.input.right.down) {
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

  render(lag) {
    let rposX = this.posX + this.velX*lag;
    let rposY = this.posY + this.velY*lag;

    gAssetLoader.load(['./assets/sprites/player.png'], (img) => {
      image(img, rposX-2, rposY-4);
    });
  }

}
