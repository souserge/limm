class GameSystem { // a class for handling interactions between objects
  constructor(player) {
    this.level = null;
    this.player = player || new Player(width/2, height/2, 100, 100); // if passed..
          // as an argument, assign a player, create a new Mover otherwise
    this.timeManager = new TimeManager();
    this.flags = {
      level: {
        requested: null,
        loaded: false
      },
      game: {
        over: false

      }
    }

    this.movers = [];

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
    this.flags.level.requested = levelID;
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
    this.checkEvents(this.player);
    this.level.tilelayer.checkActiveCollision(this.player);

    if (this.player.killed) {
      this.flags.game.over = true;
      return;
    }
    this.player.updateVel(this.input);
    this.player.updatePos(dt, this.level.tilelayer);
  }

  loadLevel() {
    if (this.flags.level.requested !== null) {
      this.flags.level.loaded = false;
      this.level = gameWorlds[currWorld].getLevel(this.flags.level.requested); // rewrite!!
      this.flags.level.loaded = true;
      this.flags.level.requested = null;
    }
  }

  animateFrame() {
    this.loadLevel();

    if (!this.flags.level.loaded) return;

    this.timeManager.updateDelta();
    let preventer = 0;
    while (this.timeManager.dt >= this.timeManager.timestep) {
      this.keyCheck();
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
          mover.posX = (res.x+this.level.offset.x)*res.tilesize;
          mover.posY = (res.y+this.level.offset.y)*res.tilesize - 0.01;
          mover.velX = 0;
          mover.velY = 0;
          break;
      }
    }
  }

  render(lag) {
    if (this.flags.game.over) {
      textAlign(CENTER);
      textSize(48);
      fill(255);
      text("Game Over", width/2, height/2);
      return;
    }
    this.level.render();
    this.player.render(lag);
  }
}
