class Mover { // base class of a Mover object (player or NPC)
  constructor(x, y, r) { // set initial values

    this.pos = createVector(x, y);  // position
    this.vel = createVector(0,0);   // velocity
    this.acc = createVector(0,0);   // acceleration

    this.r =   r; //radius (size)
    this.moveForce = createVector(HORIZONTAL_MOVE_FORCE, VERTICAL_MOVE_FORCE);//..
                                    // reflects the strength of the mover's legs
    this.isGrounded = false; // true if is on ground, false otherwise
    this.input = {up: false, down: false, right: false, left: false} // stores..
                                            // the current state of user input
  }

  updateNetForce(dt) { // accumulate all the forces that..
                    // act upon the mover at this moment
    this.keyCheck();

    this.gravity();
    this.move();
    this.jump();

    if (!this.isGrounded) { // constrain the mover's ability to steer in air
      this.acc.x = constrain(this.acc.x,
                            -MAX_AIR_HORIZONTAL_ACC, MAX_AIR_HORIZONTAL_ACC);
      this.acc.x *= 0.1;
    }

    this.acc.mult(dt); // multiply by delta time
    this.vel.add(this.acc); // change velocity
    this.applyFriction();
  }

  updatePos() { // update the current position..
  //update() was split into 2 parts in order to check for collisions in between
    this.pos.add(this.vel); // change the position according to
    this.acc.mult(0); // discard all forces (we add them again every update)
  }


  keyCheck() { // update the current state of user input
    this.input.left = keyIsDown(LEFT_ARROW);
    this.input.right = keyIsDown(RIGHT_ARROW);
    this.input.up = keyIsDown(UP_ARROW);
  }

  applyFriction() { // constrain velocity and add dampening
    if (!this.isGrounded) {
      this.vel.y = constrain(this.vel.y,
                            -MAX_VERTICAL_SPEED, MAX_VERTICAL_SPEED);
    }
    else {
      this.vel.x *= WALL_FRICTION;
    }
    this.vel.x = constrain(this.vel.x,
                          -MAX_HORIZONTAL_SPEED, MAX_HORIZONTAL_SPEED);
  }

  applyForce(force) { // add a force to the acceleration
    this.acc.add(force);
  }

  jump() { // add vertical moveForce
    if (this.input.up) { // if the mover wants to jump
      if (this.isGrounded) { // if the mover is on ground
        this.applyForce(createVector(0,-this.moveForce.y));
        this.isGrounded = false;
      }
      // else if (this.vel.y > -6) {
      //   this.vel.y -= 0.2;
      // }
    }
  }

  gravity() { // apply gravity
    this.applyForce(createVector(0,GRAVITY));
  }

  move() { // apply horizontal moveForce
    const LIMIT = this.isGrounded ? 1 : AIR_HORIZONTAL_MOVE_FORCE;
    if (this.input.right) {
      this.applyForce(createVector(LIMIT*this.moveForce.x, 0));
    }
    if (this.input.left) {
      this.applyForce(createVector(-LIMIT*this.moveForce.x, 0));
    }
  }

  render() { // draw on the screen
    fill(255); // set the color of the mover to white
    noStroke(); // do not draw borders
    rectMode(RADIUS); // x and y coordinates are in the center of the rectangle
    rect(this.pos.x, this.pos.y, this.r, this.r); // r is width/2
  }
}

//export {Mover};
