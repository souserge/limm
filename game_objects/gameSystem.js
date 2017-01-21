const GAME_SYSTEM = {
  HALT_TIME: 5
}

class GameSystem { // a class for handling interactions between objects
  constructor() {
    this.level = null;
    this.player = new Player(0,0);
    this.timeManager = new TimeManager();
    this.checkpoint = {
      x: 0,
      y: 0
    }
    this.flags = {
      level: {
        requested: null,
        loaded: false,
        callback: null
      },
      game: {
        over: false,
        halt: GAME_SYSTEM.HALT_TIME
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

  update(dt) { // update player and check for collisions
    this.checkEvents();
    this.level.checkActiveCollision(this.player);

    if (this.player.killed) {
      this.restartGame();
      return;
    }
    for (let mover of this.movers) {
      if(!mover.killed) {
        mover.update(dt);
        this.killOutOfBoundMover(mover);
      }
    }
    this.player.update(dt);
    this.killOutOfBoundMover(this.player);
  }

  animateFrame() {
    this.loadLevel();

    if (!this.flags.level.loaded || this.level === null) return;

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

  render(lag) {
    if (this.flags.game.over) {
      textAlign(CENTER);
      textSize(48);
      fill(255);
      text("Game Over", width/2, height/2);
      if (this.flags.game.halt <= 0) {
        textSize(24);
        text("press action to continue", width/2, height/2+48);
      }
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

  restartGame() {
    this.flags.game.over = true;

    this.flags.game.halt -= 0.1;
    if (this.flags.game.halt <= 0 && this.input.action.pressed) {
      this.flags.game.halt = GAME_SYSTEM.HALT_TIME;
      this.player.killed = false;
      this.flags.game.over = false;
      //this.movers = [];
      this.changeLevel(this.level.id, (level) => {
        this.changeLevelCallback(level,this.checkpoint.x, this.checkpoint.y);
      });
    }
  }

  spawnMover(ent) {
    this.movers.push(ent);
  }

  setCheckpoint(px, py) {
    this.checkpoint.x = px;
    this.checkpoint.y = py;
  }

  killOutOfBoundMover(mover) {
    if (mover.posX > this.level.pixelSize.x ||
        mover.posY > this.level.pixelSize.y ||
        mover.posX < this.level.pixelOffset.x ||
        mover.posY < this.level.pixelOffset.y) mover.killed = true;
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

  changeLevel(levelID, callback) {
    this.flags.level.requested = levelID;
    this.flags.level.callback = callback;
  }

  checkEvents() {
    let mover = this.player;
    let res = this.level.eventlayer.collision(mover.posX, mover.posY, mover.wid, mover.hei);
    if (res && res !== false && this.input.action.pressed) {
      switch(res.type) {
        case EVENTS.TELEPORT:
          if (res.data.level.id !== null) {
            this.changeLevel(res.data.level.id, (level) => {
              let px = (res.data.level.tx + level.offset.x)*level.tilesize;
              let py = (res.data.level.ty + level.offset.y)*level.tilesize - 0.01;
              this.changeLevelCallback(level, px, py);
            });
          } else {
            this.teleportPlayer((res.data.level.tx+this.level.offset.x)*res.tilesize, (res.data.level.ty+this.level.offset.y)*res.tilesize - 0.01);
          }
          break;
      }
    }
  }


  changeLevelCallback(level, px, py) {
    this.setCheckpoint(px, py);
    this.teleportEntity(this.player, px, py);
    
    for (let ent of level.entities) {
      this.spawnMover(ent);
    }
  }

  setStartLevel(path) {
    this.changeLevel(path, (level) => {
      let spawnTX = level.size.x/2; // TODO!!!!!!!!!!!!!!!!!!!! change to tx and ty in level editor
      let spawnTY = level.size.y/2;
      if (level.playerSpawn.value) {
        spawnTX = level.playerSpawn.tx;
        spawnTY = level.playerSpawn.ty;
      }
      let px = (spawnTX+level.offset.x)*level.tilesize;
      let py = (spawnTY+level.offset.y)*level.tilesize - 0.01;
      this.changeLevelCallback(level, px, py);
    });
  }

  loadLevel() {
    if (this.flags.level.requested !== null) {
      this.flags.level.loaded = false;
      gLevelLoader.get(this.flags.level.requested, (newLevel) => {

        this.level = newLevel;
        this.movers = [];
        if (this.flags.level.callback) {
          this.flags.level.callback(newLevel);
        }
        this.flags.level.callback = null;

        this.flags.level.loaded = true;
      });
      this.flags.level.requested = null; // to prevent loading level multiple times
    }
  }

}
