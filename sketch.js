//import {Mover} from "./classes/mover.js";
//import {Wall} from "./classes/wall.js";

function preload() { // will need it for loading textures, sounds and other files

}

function setup() {
  createCanvas(720, 480);
  restartSketch();
  textFont("Courier New");
}

function restartSketch() {
  gameSystem = new GameSystem(new Mover(width/2, height-100, 16, 16));
  buildTestLevel();
}

function buildTestLevel() {
  const WALL_WID = 16;
  gameSystem.addWall(new Wall(0,0,WALL_WID,height - WALL_WID));
  gameSystem.addWall(new Wall(width-WALL_WID, 0, WALL_WID, height - WALL_WID));
  gameSystem.addWall(new Wall(0, height-WALL_WID, width, WALL_WID));
  gameSystem.addWall(new Wall(WALL_WID, 0, width-WALL_WID*2, WALL_WID));

  gameSystem.addWall(new Wall(width/2+90,height/2+100, WALL_WID*5, WALL_WID));
  gameSystem.addWall(new Wall(width/2-100,height/2+30, WALL_WID*5, WALL_WID));
  gameSystem.addWall(new Wall(WALL_WID,height/2-40, WALL_WID*5, WALL_WID));
  gameSystem.addWall(new Wall(width-WALL_WID*8, WALL_WID*11, WALL_WID*5, WALL_WID));

}

function draw() {
  background(100, 50, 100);
  fill(150, 75, 150);
  textSize(64);
  textAlign(CENTER);
  text('Welcome to limm', width/2, height/2-100);
  textSize(32);
  text('change_tile branch', width/2, height/2-50);
  gameSystem.update();
  gameSystem.render();
}
