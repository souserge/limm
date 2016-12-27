class GameSystem {
  constructor(player) {
    this.walls = [];
    this.player = player || new Mover(width/2, height/2, 10);
  }

  addWall(wall) {
    this.walls.push(wall);
  }

  update(dt) {
    this.player.updateNetForce(dt);
    this.moverWallCollision(this.player);
    this.player.updatePos();
  }

  moverWallCollision(mover) {
    for (let wall of this.walls) {

      if (collideRectRect(mover.pos.x + mover.vel.x - mover.r, mover.pos.y - mover.r, 2*mover.r, 2*mover.r, wall.pos.x, wall.pos.y, wall.wid, wall.hei)) {
        let preventer = 0;
        while (!collideRectRect(mover.pos.x + Math.sign(mover.vel.x) - mover.r, mover.pos.y - mover.r, 2*mover.r, 2*mover.r, wall.pos.x, wall.pos.y, wall.wid, wall.hei)) {
          mover.pos.x += Math.sign(mover.vel.x);
          if (++preventer > 30) {
            break;
          }
        }
        mover.vel.x = 0;

      }

      if (collideRectRect(mover.pos.x - mover.r, mover.pos.y + mover.vel.y - mover.r, 2*mover.r, 2*mover.r, wall.pos.x, wall.pos.y, wall.wid, wall.hei)) {
        let preventer = 0;
        while (!collideRectRect(mover.pos.x - mover.r, mover.pos.y + Math.sign(mover.vel.y) - mover.r, 2*mover.r, 2*mover.r, wall.pos.x, wall.pos.y, wall.wid, wall.hei)) {
          mover.pos.y += Math.sign(mover.vel.y);
          if (++preventer > 30) {
            break;
          }
        }
        if (mover.vel.y > 0) {
          mover.isGrounded = true;
        }
        mover.vel.y = 0;
      }

    }
  }



  render() {
    for (let wall of this.walls) {
      wall.render();
    }
    this.player.render();
  }
}
