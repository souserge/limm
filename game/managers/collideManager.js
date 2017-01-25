class CollideManager {
  rectRect(x, y, w, h, x2, y2, w2, h2) {
    if (x + w >= x2 &&    // r1 right edge past r2 left
    x <= x2 + w2 &&    // r1 left edge past r2 right
    y + h >= y2 &&    // r1 top edge past r2 bottom
    y <= y2 + h2) {    // r1 bottom edge past r2 top
      return true;
    }
    return false;
  }

  pointRect(px, py, x, y, w, h) {
    return (px >= x && px <= x+w && py >= y && py <= y+h);
  }
}

let gCollideManager = new CollideManager();
