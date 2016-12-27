//import {Mover} from "./classes/mover.js";
//import {Wall} from "./classes/wall.js";

let dt, lastFrameTime;
const TIMESTEP = 1000 / 60;

function preload() {

}

function setup() {
  createCanvas(1200, 800);
  restartSketch();
}

function buildLevel() {
  const WALL_WID = 60
  gameSystem.addWall(new Wall(0,0,WALL_WID,height));
  gameSystem.addWall(new Wall(width-WALL_WID, 0, WALL_WID, height));
  gameSystem.addWall(new Wall(WALL_WID, height-WALL_WID, width-WALL_WID, WALL_WID));
  gameSystem.addWall(new Wall(WALL_WID, 0, width-WALL_WID, WALL_WID));
  gameSystem.addWall(new Wall(width/2+70,height/2+160, 70, 10));
  gameSystem.addWall(new Wall(width/2-40,height/2, 70, 10));
}

function restartSketch() {
  gameSystem = new GameSystem(new Mover(width/2, height-100, 12));
  buildLevel();

  lastFrameTime = Date.now();
  dt = 0;
}

function draw() {
  background(100, 50, 100);

  const TIMESTAMP = Date.now();
  dt += TIMESTAMP - lastFrameTime;
  lastFrameTime = TIMESTAMP;

  let preventer = 0;
  while (dt >= TIMESTEP) {
    gameSystem.update(TIMESTEP/10);
    dt -= TIMESTEP;
    if (++preventer > 100) {
      dt = 0;
      break;
    }
  }
  gameSystem.render();
}

// function keyPressed() {
//   switch(keyCode) {
//     case UP_ARROW:
//       player.jump();
//       break;
//     case RIGHT_ARROW:
//       player.setMotion(3);
//     break;
//     case LEFT_ARROW:
//       player.setMotion(-3);
//     break;
//   }
// }
//
// function keyReleased() {
//   switch(keyCode) {
//     case RIGHT_ARROW:
//     case LEFT_ARROW:
//       player.setMotion(0);
//     break;
//   }
// }
