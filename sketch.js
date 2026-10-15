
let music;
let analyzer;

let circleX = 200;
let circleY = 200;

let speedX = 2;
let speedY = 2;

let circleColour;

function preload() {
  music = loadSound("beat.mp3");
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("canvas-holder");

  circleColour = color(100, 180, 255);

  analyzer = new p5.Amplitude();
  analyzer.setInput(music);
}

function draw() {
  background(12, 20, 48);


  circleX = circleX + speedX;
  circleY = circleY + speedY;


  if (circleX > width - 50 || circleX < 50) {
    speedX = -speedX;
  }

  if (circleY > height - 50 || circleY < 50) {
    speedY = -speedY;
  }
  let volume = analyzer.getLevel();
  let circleSize = 100 + volume * 300;

  fill(circleColour);
  noStroke();
  ellipse(circleX, circleY, circleSize, circleSize);

  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("Click the canvas to play or pause the music", width / 2, height - 20);
}

function mousePressed() {
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    circleColour = color(
      random(100, 256),
      random(100, 256),
      random(150, 256)
    );

    if (music.isPlaying()) {
      music.pause();
    } else {
      userStartAudio();
      music.loop();
    }
  }
}
