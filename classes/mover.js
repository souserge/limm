class Mover {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.r =   r;
    this.speed = createVector(5, 5);
    this.isGrounded = false;
    this.input = {up: false, down: false, right: false, left: false}
  }

  updatePos() {
    this.applyFriction();
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  updateNetForce(dt) {
    this.keyCheck();

    this.gravity();
    this.move();
    this.jump();

    if (!this.isGrounded) {
      this.acc.x = constrain(this.acc.x, -0.4, 0.4);
    }

    this.acc.mult(dt);
    this.vel.add(this.acc);
  }

  keyCheck() {
    this.input.left = keyIsDown(LEFT_ARROW);
    this.input.right = keyIsDown(RIGHT_ARROW);
    this.input.up = keyIsDown(UP_ARROW);
  }

  applyFriction() {
    if (!this.isGrounded) {
      this.vel.y = constrain(this.vel.y, -20, 10);
    }
    else {
      this.vel.x *= 0.8;
    }
    this.vel.x = constrain(this.vel.x, -5, 5);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  jump() {
    if (this.input.up) {
      if (this.isGrounded) {
        this.applyForce(createVector(0,-this.speed.y));
        this.isGrounded = false;
      }
      // else if (this.vel.y > -6) {
      //   this.vel.y -= 0.2;
      // }
    }
  }

  gravity() {
    this.applyForce(createVector(0,0.1));
  }

  move() {
    if (this.input.right) {
      this.applyForce(createVector(this.speed.x, 0));
    }
    if (this.input.left) {
      this.applyForce(createVector(-this.speed.x, 0));
    }
  }

  render() {
    fill(255);
    noStroke();
    rectMode(RADIUS);
    rect(this.pos.x, this.pos.y, this.r, this.r);
  }
}

//export {Mover};
