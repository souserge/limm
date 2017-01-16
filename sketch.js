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
  console.log(width, height);
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
  gameSystem.changeLevel('TEST');
}

function draw() {
  gameSystem.animateFrame();
}