//import {Mover} from "./classes/mover.js";
//import {Wall} from "./classes/wall.js";
let map  = [];
let cnv;

function preload() { // will need it for loading textures, sounds and other files

}

function setup() {
  cnv = createCanvas(WID, HEI);
  centerCanvas();
  restartSketch();
  textFont("Courier New");
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function restartSketch() {
  gameSystem = new GameSystem(new Player(width/2, height-100, TSIZE, TSIZE));
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
  textSize(48);
  textAlign(CENTER);
  text('Welcome to limm', width/2, TSIZE*4);
}