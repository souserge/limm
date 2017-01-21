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
  console.log(window.location.hostname);
  console.log(window.location.href);

  gDrawHelper.setAppendingPath('../../');
}

function draw() {

  if (flags.started) {
    mouseHandler();
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

  if (flags.currLayer !== 'eventlayer') {
    renderEntities();
  }
  for (let i = 0; i < level.size.y; i++) {
    for (let j = 0; j < level.size.x; j++) {
      let idx = level.size.x*i+j;
      if (level.tilelayer.data[idx] !== 0) {
        renderTileTile(level.tilelayer.data[idx], j, i);
      }
    }
  }


  if (flags.currLayer === 'eventlayer') {
    fill('rgba(0,0,0, 0.25)');
    noStroke();
    rect(0,0,width,height);
    for (let i = 0; i < level.size.y; i++) {
      for (let j = 0; j < level.size.x; j++) {
        let idx = level.size.x*i+j;
        if (level.eventlayer.data[idx] !== 0) {
            renderEventTile(level.eventlayer.data[idx], j, i);
        }
      }
    }
    renderEntities();
  }

}

function renderEntities() {
  for (let ent of level.entities) {
    switch (ent.type) {
    case EVENTS.SPAWN.CRABOCOP:
    gDrawHelper.crabocop(ent.data.px, ent.data.py);
    break;
    }
  }
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
  flags.editing = true;
}

function createTeleport(x, y) {
  let j = floor(x/level.tilesize);
  let i = floor(y/level.tilesize);
  let idx = level.size.x*i+j;
  if (level.eventlayer.data[idx] !== 0) return;
  flags.currObj = 0;

  let toLevel = prompt("What level this door goes to?/n(close the prompt if to the same one)", 'yourWorld/anotherLevel');
  let tilex = prompt("Please, enter the X coordinate of the tile on the map", '16');
  let tiley = prompt("Please, enter the Y coordinate of the tile on the map", '10');
  let teleport = {
    type: EVENTS.TELEPORT,
    data: {
      level: {
        id: (toLevel === null || toLevel === "") ? null : toLevel,
        tx: (tilex === null || tilex === "") ? 8 : parseInt(tilex), // TODO: change events handling to read tx and ty
        ty: (tiley === null || tiley === "") ? 8 : parseInt(tiley)
      }
    }
  };
  level.eventlayer.data[idx] = teleport;
}

function createCrabocop(x, y) {
  flags.currObj = 0;
  let entDir = prompt("Please enter the initial direction/n( left = -1; right = 1)", '1');
  let crabocop = {
    type: EVENTS.SPAWN.CRABOCOP,
    data: {
      px: x,
      py: y,
      dir: (entDir === null || entDir === "" || entDir !== '-1' || entDir !== '1') ? 1 : parseInt(entDir),

      wid: 16, // TODO: very bad style
      hei: 16
    }
  };
  level.entities.push(crabocop);
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

  for (let i = 0; i < level.entities.length; i++) {
    let ent = level.entities[i];
    if (flags.currLayer === 'eventlayer' &&
        ent.type == EVENTS.SPAWN.CRABOCOP &&
        gCollideManager.pointRect(x, y, ent.data.px, ent.data.py, ent.data.wid, ent.data.hei)) {
      level.entities.splice(i, 1);
      return;
    }
  }

  let j = floor(x/level.tilesize);
  let i = floor(y/level.tilesize);
  let idx = level.size.x*i + j;

  layer.data[idx] = 0;
}













//EVENT HANDLING
function keyPressed() {
  if (flags.editing) {
    if (keyCode == 81) {
      flags.mode = MODE.DRAW;
      flags.currLayer = 'tilelayer';
    } else if (keyCode == 87) {
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


$(document).ready(function() {
  $('#defaultCanvas0').on('contextmenu', function(e){ return false;});
  $('#defaultCanvas0').on('mouseup', function(e){
    flags.mousePress = false;
  });
  $('#defaultCanvas0').on('mousedown', function(e){
    flags.mousePress = true;
  });
});

function mouseHandler() {
  if (!flags.started || !flags.editing) return false;
  if (flags.mousePress) {
    mouseButton == LEFT ? modifyLevel(mouseX, mouseY) : erase(mouseX, mouseY);
    return false;
  }
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
