let cnv;
let gGameSystem;
let gPreloadDone = false;
let assetList = [
  "./assets/sfx/player_jump.wav",
  "./assets/sfx/player_killed.wav",
  "./assets/sfx/crabocop_killed.wav",
  "./assets/sfx/door_open.wav",
  './assets/sprites/player.png',
  "./assets/sprites/crabocop.png",
  './assets/sprites/vantus.png'
];
let c64Font = null;
function preload() { // will need it for loading textures, sounds and other files
  c64Font = loadFont("./c64.ttf");
}

function setup() {
  cnv = createCanvas(WID, HEI);
  frameRate(MAX_FPS);
  centerCanvas();
  console.log(window.location.href);
  gAssetLoader.load(assetList, (asset) => {
    console.log("loaded");
    gPreloadDone = true;
  });

  console.log("limm test");

  //textFont("Courier New");
  textFont(c64Font);
  gDrawHelper.setAppendingPath('./');

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
    gGameSystem.setStartLevel('tutorial/01');
}

function draw() {
  if (gPreloadDone) {
    gGameSystem.animateFrame();
  } else {
    drawLoadingScreen();
  }
}


function drawLoadingScreen() {
  background(20,0,40);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("Loading...", width/2, height/2);
}
