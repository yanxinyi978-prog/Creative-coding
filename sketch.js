
let music;
let analyzer;
let circleColour;

function preload() {
  // Load the music file.
  music = loadSound("beat.mp3");
}

function setup() {
  // Create the canvas.
  let canvas = createCanvas(800, 400);
  canvas.parent("canvas-holder");

  // Set the initial circle colour.
  circleColour = color(100, 180, 255);

  // Analyse the music volume.
  analyzer = new p5.Amplitude();
  analyzer.setInput(music);
}

function draw() {
  // Set the background colour.
  background(12, 20, 48);

  // Read the music volume.
  let volume = analyzer.getLevel();

  // Change the circle size according to the volume.
  let circleSize = 100 + volume * 500;

  // Draw the circle.
  fill(circleColour);
  noStroke();
  ellipse(width / 2, height / 2, circleSize, circleSize);

  // Display instructions.
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("Click to play or stop the music", width / 2, height - 25);
}

function mousePressed() {
  // Only respond when the canvas is clicked.
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    // Play or stop the music.
    if (music.isPlaying()) {
      music.stop();
    } else {
      music.loop();
    }

    // Change the circle colour.
    circleColour = color(
      random(100, 256),
      random(100, 256),
      random(150, 256)
    );
  }
}
