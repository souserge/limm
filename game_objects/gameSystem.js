class GameSystem { // a class for handling interactions between objects
  constructor() {
    this.level = null;
    this.player = new Player(0,0);
    this.timeManager = new TimeManager();
    this.flags = {
      level: {
        requested: null,
        loaded: false,
        callback: null
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

  teleportEntity(ent, x, y) {
    ent.posX = x;
    ent.posY = y;
    ent.velX = 0;
    ent.velY = 0;
    ent.isGrounded = false;
  }

  teleportPlayer(x,y) {
    this.teleportEntity(this.player, x, y);
  }

  spawnMover(ent) {
    this.movers.push(ent);
  }

  changeLevel(levelID, callback) {
    this.flags.level.requested = levelID;
    this.flags.level.callback = callback;
  }

  checkInput(keycodes, key) {
    for (let keycode of keycodes) {
      if (keyIsDown(keycode)) {
        key.pressed = !key.down;
        key.down = true;
        return;
      }
    }
    key.pressed = key.down = false;
  }

  keyCheck() {
    this.checkInput([UP_ARROW,
                    87, // 'W'
                    90, // 'Z'
                    32],// ' '
                    this.input.jump);

    this.checkInput([RIGHT_ARROW,
                    68], // 'A'
                    this.input.right);

    this.checkInput([LEFT_ARROW,
                    65], // 'D'
                    this.input.left);

    this.checkInput([DOWN_ARROW,
                    83, // 'S'
                    88, // 'X'
                    69],// 'E'
                    this.input.action);
  }

  update(dt) { // update player and check for collisions
    this.checkEvents(this.player);
    this.level.checkActiveCollision(this.player);

    if (this.player.killed) {
      this.flags.game.over = true;
      return;
    }
    for (let mover of this.movers) {
      if(!mover.killed) {
        mover.update(dt);
      }
    }
    this.player.update(dt);
  }

  loadLevel() {
    if (this.flags.level.requested !== null) {
      this.flags.level.loaded = false;
      this.level = gameWorlds[currWorld].getLevel(this.flags.level.requested); // rewrite!!
      this.flags.level.loaded = true;
      this.flags.level.requested = null;
      this.movers = [];

      if (this.flags.level.callback) this.flags.level.callback();
      this.flags.level.callback = null;
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
          this.teleportEntity(this.player, (res.x+this.level.offset.x)*res.tilesize, (res.y+this.level.offset.y)*res.tilesize - 0.01);
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

    for (let mover of this.movers) {
      if(!mover.killed) {
        mover.render(lag);
      }
    }

    this.player.render(lag);
  }
}
