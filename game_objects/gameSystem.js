class GameSystem { // a class for handling interactions between objects
  constructor(player) {
    this.tileMap = null;
    this.player = player || new Player(width/2, height/2, 10, 10); // if passed..
          // as an argument, assign a player, create a new Mover otherwise
    this.timeManager = new TimeManager();
    this.tileMapRequested = -1;
  }

  changeTileMap(tileMapID) {
    this.tileMapRequested = tileMapID;
  }

  updateGame(dt) { // update player and check for collisions
    this.player.keyCheck();
    this.player.updateVel();
    this.checkCollision(this.player);
    this.player.updatePos(dt);
  }

  update() {
    if (this.tileMapRequested !== -1) {
      this.tileMap = getTileMap(this.tileMapRequested);
      this.tileMapRequested = -1;
    }


    this.timeManager.updateDelta();
    let preventer = 0;
    while (this.timeManager.dt >= this.timeManager.timestep) {
      this.updateGame(this.timeManager.timestep);
      this.timeManager.dt -= this.timeManager.timestep;
      if (++preventer > 100) {
        this.timeManager.dt = 0;
        break;
      }
    }
  }

  checkCollision(mover) { // check for collisions between walls and player
    let grounded = false;

    if (this.tileMap.collision(mover.posX, mover.posY + 1, mover.wid, mover.hei)) {
      grounded = true; // then he is on the ground
    }

    if (this.tileMap.collision(mover.posX + mover.velX, mover.posY, mover.wid, mover.hei)) {
      let preventer = 0;
      let xamt = Math.sign(mover.velX);
      console.log(mover.velX);
      if (xamt === 0) {
        console.log("X ZERO!!");
      }
      while(!this.tileMap.collision(mover.posX + xamt, mover.posY, mover.wid, mover.hei)) {
        mover.posX += xamt;
        if (++preventer > 30) {
          break;
        }
      }
      mover.velX = 0; // set player's velocity to 0
    }

    if (this.tileMap.collision(mover.posX, mover.posY + mover.velY, mover.wid, mover.hei)) {
      let preventer = 0;
      let yamt = Math.sign(mover.velY);
      if (yamt === 0) {
        console.log("Y ZERO!!");
      }
      while(!this.tileMap.collision(mover.posX, mover.posY + yamt, mover.wid, mover.hei)) {
        mover.posY += yamt;
        if (++preventer > 30) {
          break;
        }
      }
      mover.velY = 0; // set player's velocity to 0
    }

    mover.isGrounded = grounded;
  }

  render() { // draw the whole system

    this.tileMap.renderMap();
    this.player.render();
  }
}
