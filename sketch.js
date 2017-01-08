//import {Mover} from "./classes/mover.js";
//import {Wall} from "./classes/wall.js";
let map  = [];

function preload() { // will need it for loading textures, sounds and other files

}

function setup() {
  createCanvas(WID, HEI);
  restartSketch();
  textFont("Courier New");
}

function restartSketch() {
  gameSystem = new GameSystem(new Mover(width/2, height-100, TSIZE, TSIZE));
  gameSystem.changeTileMap(TEST_LEVEL);
}

function draw() {
  background(100, 50, 100);
  displayMessage();
  
  gameSystem.update();
  gameSystem.render();
}

function displayMessage() {
  fill(150, 75, 150);
  textSize(64);
  textAlign(CENTER);
  text('Welcome to limm', width/2, height/2-100);
  textSize(32);
  text('change_tile branch', width/2, height/2-50);
}