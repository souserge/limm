
let cnv = null;

function setup() {
  cnv = createCanvas(windowWidth/2, windowHeight/2);
  createP('');
  ui.init();
  toolbar.init();
  ui.div.show();
  textFont("Courier New");
}

function getCurrTile() {
  if (flags.currLayer === null ||
      mouseX >= level.size.x*level.tilesize ||
      mouseY >= level.size.y*level.tilesize ||
      mouseX < 0 || mouseY < 0) return {x:'-', y: '-'};

  return {
    x: floor(mouseX/level.tilesize),
    y: floor(mouseY/level.tilesize),
  }
}

function keyPressed() {
  switch(keyCode) {
  case 49: // 1
    break;
  case 50: // 2
    break;
  case 51: // 3
    break;
  case 52: // 4
    break;
  case 53: // 5
    break;
  case 54: // 6
    break;
  case 55: // 7
    break;
  case 56: // 8
    break;
  case 57: // 9
    break;
  case 48: // 0
    break;
  }
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
            break;
          case "entitylayer":
            renderEntityTile(layer.data[idx], j, i);
            break;
        }
      }
    }
  }
}

function renderEntityTile(tileid, x, y) {
 
}

function renderTileTile(tileid, x, y) {

  let px = x*level.tilesize;
  let py = y*level.tilesize;

  switch(tileid) {
  case TILES.WALL:
     fill(level.color.r,level.color.g,level.color.b);
     rect(px, py, level.tilesize, level.tilesize);
     break;
  }
}

function renderEventTile(tileid, x, y) {
  
}

function drawTile(x, y) {
  if (flags.currLayer === null) return;
  let layer = level[flags.currLayer];

  if (x >= level.size.x*level.tilesize || y >= level.size.y*level.tilesize ||
      x < 0 || y < 0) return;

  let j = floor(x/level.tilesize);
  let i = floor(y/level.tilesize);
  let idx = level.size.x*i+j;

  layer.data[idx] = flags.currObj;
}

function eraseTile(x, y) {
  if (flags.currLayer === null) return;
  let layer = level[flags.currLayer];

  if (x >= level.size.x*level.tilesize || y >= level.size.y*level.tilesize ||
      x < 0 || y < 0) return;

  let j = floor(x/level.tilesize);
  let i = floor(y/level.tilesize);
  let idx = level.size.x*i + j;

  layer.data[idx] = 0;
}

function mouseDown() {
  if (!flags.started) return false;

  switch (flags.mode) {
    case MODE.DRAW:
      mouseButton == LEFT ? drawTile(mouseX, mouseY) : eraseTile(mouseX, mouseY);
      break;
  }
  return false;
}

function draw() {
  if (flags.started) {
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

function renderLevel() {
  if (mouseIsPressed) mouseDown();
  background(level.color.r*0.5, level.color.g*0.5, level.color.b*0.5);
  renderMap();
  fill('rgba(0,0,0, 0.25)');
  noStroke();
  rect(0, 0, (-level.offset.x+level.viewSize.x)*level.tilesize, -1*level.offset.y*level.tilesize);
  rect(0, -1*level.offset.y*level.tilesize, -1*level.offset.x*level.tilesize, level.size.y*level.tilesize);
  rect((level.viewSize.x - level.offset.x)*level.tilesize, 0, (level.size.x + level.offset.x - level.viewSize.x)*level.tilesize, (level.viewSize.y-level.offset.y)*level.tilesize);
  rect(-1*level.offset.x*level.tilesize, (level.viewSize.y - level.offset.y)*level.tilesize, (level.size.x+level.offset.x)*level.tilesize, (level.size.y + level.offset.y - level.viewSize.y)*level.tilesize);
}


$(document).ready(function() {
  $('#defaultCanvas0').on('contextmenu', function(e){ return false;});
});