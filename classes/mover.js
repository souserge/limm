class Mover {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.r =   r;
    this.xSpeed = 0;
  }

  update() {
    this.gravity();
    this.move();

    this.vel.add(this.acc);
    this.vel.x *= 0.9;
    this.vel.x = constrain(this.vel.x, -3, 3);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.collideGround();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  jump() {
    if (this.pos.y+this.r >= height-1) {
      this.applyForce(createVector(0,-9));
      console.log("jump!");
    }
  }

  gravity() {
    this.applyForce(createVector(0,0.1));
  }

  move() {
    this.applyForce(createVector(this.xSpeed, 0));
  }

  setMotion(speed) {
    this.xSpeed = speed;
  }

  collideGround() {
    if (this.isCollideGround()) {
      this.pos.y = height - this.r-1;
    }
  }

  isCollideGround() {
    if (this.pos.y+this.r > height) {return true;}
    return false;
  }

  render() {
    fill(255);
    rect(this.pos.x, this.pos.y, this.r, this.r);
  }
}
