//SWTUP AND MAIN LOOP
let cnv = null;

function setup() {
  cnv = createCanvas(windowWidth/2, windowHeight/2);
  createP('');
  ui.init();
  toolbar.init();
  ui.div.show();
  textFont("Courier New");
  console.log("tilemap editor - beta");
  loop();
}

function draw() {

  if (flags.started) {
    if (mouseIsPressed) mouseDown();
    renderLevel();
    toolbar.draw();
  } else {
    ui.color.update();
    background(0);
    fill(255);
    textSize(18);
    textAlign(CENTER);
    text("Please enter the settings\nbelow this canvas\nand hit 'start'", width/2, height/2);
  }
}

$(document).ready(function() {
  $('#defaultCanvas0').on('contextmenu', function(e){ return false;});
});












//RENDERING
function renderLevel() {
  background(level.color.r*0.5, level.color.g*0.5, level.color.b*0.5);
  renderMap();
  renderBorders();
}

function renderBorders() {
  fill('rgba(0,0,0, 0.25)');
  noStroke();
  rect(0, 0, (-level.offset.x+level.viewSize.x)*level.tilesize, -1*level.offset.y*level.tilesize);
  rect(0, -1*level.offset.y*level.tilesize, -1*level.offset.x*level.tilesize, level.size.y*level.tilesize);
  rect((level.viewSize.x - level.offset.x)*level.tilesize, 0, (level.size.x + level.offset.x - level.viewSize.x)*level.tilesize, (level.viewSize.y-level.offset.y)*level.tilesize);
  rect(-1*level.offset.x*level.tilesize, (level.viewSize.y - level.offset.y)*level.tilesize, (level.size.x+level.offset.x)*level.tilesize, (level.size.y + level.offset.y - level.viewSize.y)*level.tilesize);
}

function renderMap() {
  if (flags.currLayer === null) return;
  let layer = level[flags.currLayer];

  for (let i = 0; i < level.size.y; i++) {
    for (let j = 0; j < level.size.x; j++) {
      let idx = level.size.x*i+j;
      if (layer.data[idx] !== 0) {
        switch (flags.currLayer) {
          case "tilelayer":
            renderTileTile(layer.data[idx], j, i);
            break;
          case "eventlayer":
            renderEventTile(layer.data[idx], j, i);
            renderEntities();
            break;
        }
      }
    }
  }
}

function renderEntities() {

}

function renderTileTile(tileid, x, y) {

  let px = x*level.tilesize;
  let py = y*level.tilesize;

  switch(tileid) {
  case TILES.WALL:
     gDrawHelper.wall(px, py, level.tilesize, level.color);
     break;
  case TILES.DOOR:
    gDrawHelper.door(px, py, level.tilesize, level.color);
    break;
  case TILES.VANTUS:
    gDrawHelper.vantus(px, py);
    break;
  }
}

function renderEventTile(tileid, x, y) {
  let px = x*level.tilesize;
  let py = y*level.tilesize;

  switch (tileid.type) {
  case EVENTS.TELEPORT:
    renderTeleport(px, py);
    break;
  }
}

function renderTeleport(px, py) {
  fill(0);
  rect(px,py,level.tilesize, level.tilesize);
  textSize(level.tilesize);
  fill(255);
  text("T", px+level.tilesize/2, py+level.tilesize);
}















//LEVEL MODIFYING
function modifyLevel(x, y) {
  if (flags.currLayer === null ||
      x >= level.size.x*level.tilesize ||
      y >= level.size.y*level.tilesize ||
      x < 0 || y < 0) return;

  switch (flags.mode) {
  case MODE.DRAW:
    drawTile(x, y);
    break;
  case MODE.EVENT:
    createEvent(x, y);
    break;
  }
}

function createEvent(x, y) {
  flags.editing = false;
  switch(flags.currObj) {
  case EVENTS.TELEPORT:
    createTeleport(x, y);
    break;
  case EVENTS.SPAWN.CRABOCOP:
    createCrabocop(x, y);
  }
}

function createTeleport(x, y) {
  let j = floor(x/level.tilesize);
  let i = floor(y/level.tilesize);
  let idx = level.size.x*i+j;
  let teleport = {
    type: EVENTS.TELEPORT,
    data: {
      level: {
        id: 'change this to real id',
        tx: -1, // TODO: change events handling to read tx and ty
        ty: -1
      }
    }
  };
  level.eventlayer.data[idx] = teleport;
  flags.editing = true;
}

function createCrabocop(x, y) {
  flags.editing = true;
}

function drawTile(x, y) {
  let j = floor(x/level.tilesize);
  let i = floor(y/level.tilesize);
  let idx = level.size.x*i+j;
  level.tilelayer.data[idx] = flags.currObj;
}

function erase(x, y) {
  if (flags.currLayer === null) return;
  let layer = level[flags.currLayer];

  if (x >= level.size.x*level.tilesize || y >= level.size.y*level.tilesize ||
      x < 0 || y < 0) return;

  let j = floor(x/level.tilesize);
  let i = floor(y/level.tilesize);
  let idx = level.size.x*i + j;

  layer.data[idx] = 0;
}













//EVENT HANDLING
function keyPressed() {
  if (flags.editing) {
    if (keyCode == 90) {
      flags.mode = MODE.DRAW;
      flags.currLayer = 'tilelayer';
    } else if (keyCode == 88) {
      flags.mode = MODE.EVENT;
      flags.currLayer = 'eventlayer';
    }
    if (keyCode > 47 && keyCode < 58) {
      if (flags.mode == MODE.DRAW) {
        changeDrawObj(keyCode);
      } else if (flags.mode == MODE.EVENT) {
        changeEventObj(keyCode);
      }
    }
  }
}

function mouseDown() {
  if (!flags.started || !flags.editing) return false;

  mouseButton == LEFT ? modifyLevel(mouseX, mouseY) : erase(mouseX, mouseY);
  return false;
}











//HELPER FUNCTIONALITY
function getCurrTilePos() {
  if (flags.currLayer === null ||
      mouseX >= level.size.x*level.tilesize ||
      mouseY >= level.size.y*level.tilesize ||
      mouseX < 0 || mouseY < 0) return {x:'-', y: '-'};

  return {
    x: floor(mouseX/level.tilesize),
    y: floor(mouseY/level.tilesize),
  }
}

function changeEventObj(kcode) {
  switch(kcode) {
  case 49: // 1
    flags.currObj = EVENTS.TELEPORT;
    break;
  case 50: // 2
    flags.currObj = EVENTS.SPAWN.CRABOCOP;
    break;
  }
}

function changeDrawObj(kcode) {
  switch(kcode) {
  case 49: // 1 = WALL
    flags.currObj = TILES.WALL;
    break;
  case 50: // 2
    flags.currObj = TILES.DOOR;
    break;
  case 51: // 3
    flags.currObj = TILES.VANTUS;
    break;
  }
}
