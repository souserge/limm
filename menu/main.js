let cnv = null, ctx = null;
let stars1 = [], stars2 = [];
const FREQ = 1000;
let change = false;
const STAR_COUNT = 80, STAR_SIZE = 2;

let navEnterSnd = null, navSelectSnd = null;

$(document).ready(init);

function initEventListeners() {
  $("#nav").on("mouseenter", 'a', function() {
    navEnterSnd.play();
  });
}

function loadAssets() {
  navEnterSnd = new Audio('./menu/nav_enter.wav');
}

function init() {
  cnv = $("#stars").get(0);
  ctx = cnv.getContext("2d");
  loadAssets();
  initEventListeners();

  ctx.fillStyle = "#140028";
  ctx.fillRect(0,0,cnv.width,cnv.height);

  createStarfield(stars1, STAR_COUNT);
  createStarfield(stars2, STAR_COUNT);
  drawStars();
}

function drawStars() {
  ctx.fillStyle = "#140028";
  ctx.fillRect(0,0,cnv.width,cnv.height);

  let color1 = "#aaccbb";
  let color2 = "#5577cc";
  if (change) {
    let temp = color1;
    color1 = color2;
    color2 = temp;
    change = false;
  } else {
    change = true;
  }
  for (let star of stars1) {
    console.log
    star.draw(color1);
  }
  for (let star of stars2) {
    star.draw(color2);
  }

  setTimeout(drawStars, FREQ);
}

function createStarfield(stars, num) {
  for (let i = 0; i < num; i++) {
    let x = Math.floor(Math.random()*cnv.width);
    let y = Math.floor(Math.random()*cnv.height);
    let size = Math.floor(Math.random()*STAR_SIZE)+1;
    stars.push(new Star(x, y, size));
  }
}

class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(color) {
    ctx.fillStyle = color;
    this.drawTwo();
  }

  drawOne() {
    ctx.fillRect(this.x-this.size*2, this.y, this.size*5, this.size);
    ctx.fillRect(this.x, this.y-this.size*2, this.size, this.size*5);
  }

  drawTwo() {
    ctx.fillRect(this.x-this.size, this.y, this.size*3, this.size);
    ctx.fillRect(this.x, this.y-this.size, this.size, this.size*3);
  }

  drawThree() {
    ctx.fillRect(this.x-this.size, this.y, this.size*2, this.size);
  }
  drawFour() {
    ctx.fillRect(this.x-this.size, this.y, this.size, this.size);
  }
}
