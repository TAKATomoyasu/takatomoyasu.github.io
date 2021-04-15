let x = 0.0,
  y = 0.0,
  px = 0.0,
  py = 0.0,
  dx = 0.0,
  dy = 0.0,
  angle = 0.0;
let radius = 100;

const points = [];

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  noStroke();
  fill(255);

  x += (mouseX - x) / 5.0;
  y += (mouseY - y) / 5.0;
  dx += ((x - px) - dx) / 2.0;
  dy += ((y - py) - dy) / 2.0;
  let d = abs(dx) + abs(dy);
  if (d > 0) angle = atan2(dy, dx);

  px = x;
  py = y;

  push();
  translate(x, y);
  rotate(angle);
  ellipse(0, 0, radius, max(10, radius - d / 1.0));
  pop();


  // クリックエフェクト
  for (let i = 0; i < points.length; i++) {
    points[i].update();
  }
}


function mousePressed() {
  points.push(new PointerClick(mouseX, mouseY, 0));
}


class PointerClick {
  
  click_size = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  update() {
    fill(255, 200, 200, 255 - this.click_size);
    ellipse(this.x, this.y, this.click_size, this.click_size);
    this.click_size += 10;
  }
}