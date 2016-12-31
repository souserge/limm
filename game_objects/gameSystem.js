class GameSystem { // a class for handling interactions between objects
  constructor(player) {
    this.walls = []; // stores all walls
    this.player = player || new Mover(width/2, height/2, 10, 10); // if passed..
          // as an argument, assign a player, create a new Mover otherwise
    this.timeManager = new TimeManager();
  }

  addWall(wall) { // add new wall to the walls array
    this.walls.push(wall);
  }

  updateGame(dt) { // update player and check for collisions
    this.player.updateVel(dt);
    this.moverWallCollision(this.player);
    this.player.updatePos();
  }

  update() {
    this.timeManager.updateFixed((ts) => {
      this.updateGame(ts);
    });
  }

  moverWallCollision(mover) { // check for collisions between walls and player
    let grounded = false;
    for (let wall of this.walls) { // for every wall in walls array..

      // horizontal collision
      if (collideRectRect(mover.posX + mover.velX, mover.posY, mover.wid, mover.hei,
                          wall.posX, wall.posY, wall.wid, wall.hei)) {
      // if player will collide in the next frame, correct his velocity and position
        let preventer = 0;
        while (!collideRectRect(mover.posX + Math.sign(mover.velX), mover.posY,
                              mover.wid, mover.hei, wall.posX, wall.posY, wall.wid, wall.hei)) {
          mover.posX += Math.sign(mover.velX); // move the player as long..
           // as he does not collide with the wall
          if (++preventer > 30) {  // if executed too many times, then break
            break;
          }
        }
        mover.velX = 0;
      }

      // vertical collision, mostly the same logic
      if (collideRectRect(mover.posX, mover.posY + mover.velY, mover.wid, mover.hei,
                          wall.posX, wall.posY, wall.wid, wall.hei)) {
        let preventer = 0;
        while (!collideRectRect(mover.posX, mover.posY + Math.sign(mover.velY),
                              mover.wid, mover.hei, wall.posX, wall.posY, wall.wid, wall.hei)) {
          mover.posY += Math.sign(mover.velY);
          if (++preventer > 30) {
            break;
          }
        }
        if (mover.velY > 0) { // if player was about to collide from above,..
          grounded = true; // then he is on the ground
        }
        mover.velY = 0; // set player's velocity to 0
      }
    }
    mover.isGrounded = grounded;
  }

  render() { // draw the whole system
    for (let wall of this.walls) {
      wall.render();
    }
    this.player.render();
  }
}
