const MAX_FPS = 60;
const TIMESTEP = 1000 / MAX_FPS;

class TimeManager { // manager for delta time and fps
  constructor() {
    this.dt = 0;
    this.lastFrameTime = Date.now();
    this.timestep = TIMESTEP;
  }

  updateDelta() {
    const TIMESTAMP = Date.now();
    this.dt += TIMESTAMP - this.lastFrameTime;
    this.lastFrameTime = TIMESTAMP;
  }
}
