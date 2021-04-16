const smooth = 5.0,
  damp = 0.7;
let x = 0.0,
  y = 0.0,
  vx = 0.0,
  vy = 0.0,
  radius = 100.0,
  xpos = 0.0,
  ypos = 0.0;


const points = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasSetup;
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  // fftSetup();

}

function draw() {
  background(255);
  noStroke();
  fill(255, 200, 200);

  xpos = mouseX;
  ypos = mouseY;

  vx += (xpos - x) / smooth;
  vy += (ypos - y) / smooth;
  vx *= damp;
  vy *= damp;

  x += vx;
  y += vy;
  x += (xpos - x) / 20.0;
  y += (ypos - y) / 20.0;

  let d = abs(vx) + abs(vy);
  // d*=2.0;
  let angle = atan2(vy, vx);
  push();
  translate(x, y);

  rotate(angle);
  ellipse(0, 0, radius + d, max(10, radius - d));
  pop();



  // クリックエフェクト
  for (let i = 0; i < points.length; i++) {
    points[i].update();
    if (points[i].effect_size > 300) print("1");
  }
  // fftDraw();

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





let mic, fft;

function fftSetup() {
  mic = new p5.AudioIn();

  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function fftDraw() {
  noFill();
  stroke(255, 200, 200);
  let spectrum = fft.analyze();

  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(map(i, 0, spectrum.length, 0, width), map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
}