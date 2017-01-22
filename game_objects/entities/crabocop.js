const CRABOCOP = {
  WID: 16,
  HEI: 16,
  INIT_VELX: 1,
  X_SP: 1,
  X_MAX_SP: 2
}
class Crabocop extends Mover {
  constructor(x, y, dir) {
    let params = {
      jump: Y_MOVE_SP,
      gravity: GRAVITY,
      maxVelX: CRABOCOP.X_MAX_SP,
      maxVelY: Y_MAX_SP
    }
    super(x, y, CRABOCOP.WID, CRABOCOP.HEI, params);
    this.dirX = (dir === -1 || dir === 1) ? dir : 1;
  }

  moveX() {
    let edgeX = Math.sign(this.velX) == 1 ? this.wid : 0;
    if(gGameSystem.level.wallCollision(this.posX + edgeX + 4*this.dirX, this.posY + this.hei-1)) {
      this.dirX *= -1;
    }

    if (this.isGrounded && !gGameSystem.level.wallCollision(this.posX + edgeX + this.dirX, this.posY + this.hei + 2)) {
      this.dirX *= -1;
      this.velX = 0;
    }

    this.velX += this.dirX*CRABOCOP.X_SP;
  }

  checkPlayerCollision() {
    let p = gGameSystem.player;
    if (gCollideManager.rectRect(p.posX, p.posY, p.wid, p.hei, this.posX, this.posY, this.wid, this.hei)) {
      if (this.prevPosY > p.prevPosY+p.hei*0.5) {
        gAssetLoader.load(["./assets/sfx/crabocop_killed.wav"], (snd) => {
          snd.playMode('restart');
          snd.play();
        });
        this.killed = true;
        p.velY *= -1;
      } else {
        p.killed = true;
      }
    }
  }

  update(dt) {
    this.checkPlayerCollision();
    super.update(dt);
  }

  render(lag) {
    let rposX = this.posX + this.velX*lag;
    let rposY = this.posY + this.velY*lag;

    gDrawHelper.crabocop(rposX, rposY);
  }
}
