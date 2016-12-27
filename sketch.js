//import {Mover} from "./classes/mover.js";
//import {Wall} from "./classes/wall.js";

function preload() {

}

function setup() {
  createCanvas(900, 600);
  restartSketch();
  textFont("Courier New");
}

function restartSketch() {
  gameSystem = new GameSystem(new Mover(width/2, height-100, 12));
  buildTestLevel();
}

function buildTestLevel() {
  const WALL_WID = 50;
  gameSystem.addWall(new Wall(0,0,WALL_WID,height));
  gameSystem.addWall(new Wall(width-WALL_WID, 0, WALL_WID, height));
  gameSystem.addWall(new Wall(WALL_WID, height-WALL_WID, width-WALL_WID, WALL_WID));
  gameSystem.addWall(new Wall(WALL_WID, 0, width-WALL_WID, WALL_WID));
  gameSystem.addWall(new Wall(width/2+70,height/2+160, 70, 10));
  gameSystem.addWall(new Wall(width/2-40,height/2, 70, 10));

  gameSystem.addWall(new Wall(WALL_WID-40,height/2-40, 100, 10));
  gameSystem.addWall(new Wall(width-WALL_WID - 72, WALL_WID*4, 72, 24));
  gameSystem.addWall(new Wall(width-WALL_WID - 72, WALL_WID*4-24, 23, 24));
  gameSystem.addWall(new Wall(width-WALL_WID - 24, WALL_WID*4-24, 24, 24));

}

function draw() {
  background(100, 50, 100);
  fill(150, 75, 150);
  textSize(64);
  textAlign(CENTER);
  text('Welcome to limm', width/2, height/2-100);
  gameSystem.update();
  gameSystem.render();
}
