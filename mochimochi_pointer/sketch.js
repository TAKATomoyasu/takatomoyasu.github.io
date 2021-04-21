const pointers = [];
const effects = [];
const samples = [];


function preload() {
  for (let i = 0; i < 7; i++) {
    samples.push(loadSound('http://taka-chin.com/mochimochi_pointer/sound/vibraphone-' + i + '.mp3'));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasSetup;
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  const smooth = 0.7;
  pointers.push(new pointer(color(255, 200, 200,200), 100.0, 5.0, smooth));
  pointers.push(new pointer(color(255, 230, 230,200), 80.0, 5.0, smooth + 0.02));
  pointers.push(new pointer(color(255, 200, 200,200), 60.0, 5.0, smooth + 0.05));
  // fftSetup();
}


function draw() {
  // background(255);
  clear();
  noStroke();

  // クリックエフェクト
  for (let i = 0; i < effects.length; i++) {
    effects[i].update();
    if (effects[i].radius > 300) {
      effects.splice(i, 1);
      if (effects.length > 0) i--;
    }
  }

  // もちもちupdate
  pointers.forEach(e => {
    e.update();
  });
  // fftDraw();
}


let lastNote = -1;
let r = -1;
function mousePressed() {
  pointers.forEach(element => {
    element.radius -= 10;
  });
  effects.push(new clickEffect(mouseX, mouseY, 100));

  while (r == lastNote) {
    r = Math.floor(Math.random() * 7);
  }

  samples[r].play();
  print(r, samples.length);
  lastNote = r;
}

function mouseReleased() {
  pointers.forEach(element => {
    element.radius += 10;
  });

  // radius = 100;
  // クリックしたらランダムな場所へジャンプ
  // xpos = random(0, width);
  // ypos = random(0, height);
}



// ここから色々なクラス

class pointer {
  constructor(c, r, s, d) {
    this.color = c;
    this.smooth = s;
    this.damp = d;
    this.radius = r;
    this.x = 0.0;
    this.y = 0.0;
    this.vx = 0.0;
    this.vy = 0.0;
    this.xpos = 0.0;
    this.ypos = 0.0;
  }

  update() {
    fill(this.color);
    this.xpos = mouseX;
    this.ypos = mouseY;

    this.vx += (this.xpos - this.x) / this.smooth;
    this.vy += (this.ypos - this.y) / this.smooth;
    this.vx *= this.damp;
    this.vy *= this.damp;

    this.x += this.vx;
    this.y += this.vy;
    this.x += (this.xpos - this.x) / 20.0;
    this.y += (this.ypos - this.y) / 20.0;

    let d = abs(this.vx) + abs(this.vy);
    // d*=2.0;
    let angle = atan2(this.vy, this.vx);
    push();
    translate(this.x, this.y);

    rotate(angle);
    ellipse(0, 0, this.radius + d, max(10, this.radius - d));
    pop();
  }
}

class clickEffect {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  update() {
    fill(255, 200, 200, 255 - this.radius);
    ellipse(this.x, this.y, this.radius, this.radius);
    this.radius += 10;
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