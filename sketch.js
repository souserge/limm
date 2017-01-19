let cnv;
let gGameSystem;
let assetList = [
  "./assets/sfx/player_jump.wav",
  './assets/sprites/player.png',
  "./assets/sprites/crabocop.png",
  './assets/sprites/vantus.png'
];

function preload() { // will need it for loading textures, sounds and other files
  gAssetLoader(assetList, (asset) => {
    
  });
}

function setup() {
  cnv = createCanvas(WID, HEI);
  frameRate(MAX_FPS);
  centerCanvas();

  console.log("limm test");
  textFont("Courier New");

  gGameSystem = new GameSystem();
  restartSketch();
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
  gGameSystem.changeLevel('TEST', function() {
    gGameSystem.spawnMover(new Crabocop(TSIZE*10, height-TSIZE*2-2, 1));
    gGameSystem.spawnMover(new Crabocop(width/2, height/2+40, 1));
    gGameSystem.teleportPlayer(width-TSIZE*2-2, height-TSIZE*2-2);
  });
}

function draw() {
  gGameSystem.animateFrame();
}
