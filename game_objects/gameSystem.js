class GameSystem { // a class for handling interactions between objects
  constructor(player) {
    this.level = null;
    this.player = player || new Player(width/2, height/2, 10, 10); // if passed..
          // as an argument, assign a player, create a new Mover otherwise
    this.timeManager = new TimeManager();
    this.levelRequested = null;
    this.input = {
      jump: {
        down: false,
        pressed: false
      },
      action: {
        down: false,
        pressed: false
      },
      right: {
        down: false,
        pressed: false
      },
      left: {
        down: false,
        pressed: false
      }
    }
  }

  changeLevel(levelID) {
    this.levelRequested = levelID;
  }

  checkOneKey(keycode, key) {
    if (keyIsDown(keycode)) {
      key.pressed = !key.down;
      key.down = true;
    } else key.pressed = key.down = false;
  }

  keyCheck() {
    this.checkOneKey(UP_ARROW, this.input.jump);
    this.checkOneKey(RIGHT_ARROW, this.input.right);
    this.checkOneKey(LEFT_ARROW, this.input.left);
    this.checkOneKey(90, this.input.action);
  }

  update(dt) { // update player and check for collisions
    this.player.updateVel(this.input);
    this.checkEvents(this.player);
    this.player.updatePos(dt, this.level.tilelayer);
  }

  loadLevel() {
    if (this.levelRequested !== null) {
      this.level = gameWorlds[currWorld].getLevel(this.levelRequested);
      this.levelRequested = null;
    }
  }

  animateFrame() {
    this.loadLevel();
    
    this.keyCheck();

    this.timeManager.updateDelta();
    let preventer = 0;
    while (this.timeManager.dt >= this.timeManager.timestep) {
      this.update();
      this.timeManager.dt -= this.timeManager.timestep;
      if (++preventer > 100) {
        this.timeManager.dt = 0;
        break;
      }
    }
    this.render(this.timeManager.dt/this.timeManager.timestep);
  }

  checkEvents(mover) {
    let res = this.level.eventlayer.collision(mover.posX, mover.posY, mover.wid, mover.hei);
    if (res !== false && this.input.action.pressed) {
      switch(res.type) {
        case EVENTS.TELEPORT:
          if (res.level !== null) {
            this.changeLevel(res.level);
          }
          mover.posX = res.x*res.tilesize;
          mover.posY = res.y*res.tilesize - 0.01;
          mover.velX = 0;
          mover.velY = 0;
          mover.moveDirY = 1;
          mover.moveDirX = 1;
          break;
      }
    }
  }

  // handleCollision(mover) {
  //   mover.isGrounded = this.level.tilelayer.collisionBottom(mover.posX, mover.posY + 2, mover.wid, mover.hei); 
  //   if (this.level.tilelayer.collision(mover.posX + mover.velX, mover.posY, mover.wid, mover.hei)) mover.velX = 0;
  //   if (this.level.tilelayer.collision(mover.posX, mover.posY + mover.velY, mover.wid, mover.hei)) mover.velY = 0;
  // }

  render(lag) {
    this.level.render();
    this.player.render(lag);
  }
}
