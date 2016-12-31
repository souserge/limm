const MAX_FPS = 60;
const TIMESTEP = 1000 / MAX_FPS;

class TimeManager { // manager for delta time and fps
  constructor() {
    this.dt = 0;
    this.lastFrameTime = Date.now();
  }

  updateDelta() {
    const TIMESTAMP = Date.now();
    this.dt += TIMESTAMP - this.lastFrameTime;
    this.lastFrameTime = TIMESTAMP;
  }

  updateFixed(callback) {
    this.updateDelta();
    let preventer = 0;
    while (this.dt >= TIMESTEP) {
      callback(TIMESTEP);
      this.dt -= TIMESTEP;
      if (++preventer > 100) {
        this.dt = 0;
        break;
      }
    }
  }

}
