let x = 0.0,
  y = 0.0,
  px = 0.0,
  py = 0.0,
  dx = 0.0,
  dy = 0.0,
  angle = 0.0,
  radius = 100,
  d = 0.0,
  xpos = 0.0,
  ypos = 0.0;

const points = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasSetup;
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  noStroke();
  fill(255, 200, 200);

  xpos = mouseX;
  ypos = mouseY;

  x += (xpos - x) / 5.0;
  y += (ypos - y) / 5.0;
  dx += ((x - px) - dx) / 1.0;
  dy += ((y - py) - dy) / 1.0;
  let dd = abs(dx) + abs(dy);  
  d += (dd - d) / 2.0;

  if (d > 0) angle = atan2(dy, dx);

  px = x;
  py = y;

  push();
  translate(x, y);
  rotate(angle);
  ellipse(0, 0, radius + d / 1.0, max(10, radius - d / 1.0));
  pop();


  // クリックエフェクト
  for (let i = 0; i < points.length; i++) {
    points[i].update();
  }
}


function mousePressed() {
  
  radius *= 0.9;
}
function mouseReleased() {
  points.push(new PointerClick(mouseX, mouseY, 100));
  radius = 100;
  // クリックしたらランダムな場所へジャンプ
  // xpos = random(0, width);
  // ypos = random(0, height);
}


class PointerClick {

  constructor(x, y, effect_size) {
    this.x = x;
    this.y = y;
    this.effect_size = effect_size;
  }

  update() {
    fill(255, 200, 200, 255 - this.effect_size);
    ellipse(this.x, this.y, this.effect_size, this.effect_size);
    this.effect_size += 10;
  }
}