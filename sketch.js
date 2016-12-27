let player;

function preload() {

}

function setup() {
  createCanvas(600, 600);
  restartSketch();
}

function restartSketch() {
  player = new Mover(width/2, height-24, 24);
}

function draw() {
  background(100);
  player.update();
  player.render();

}

function keyPressed() {
  switch(keyCode) {
    case UP_ARROW:
      player.jump();
      break;
    case RIGHT_ARROW:
      player.setMotion(3);
    break;
    case LEFT_ARROW:
      player.setMotion(-3);
    break;
  }
}

function keyReleased() {
  switch(keyCode) {
    case RIGHT_ARROW:
    case LEFT_ARROW:
      player.setMotion(0);
    break;
  }
}
