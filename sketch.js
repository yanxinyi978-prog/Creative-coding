
let circleColour;

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("canvas-holder");

  circleColour = color(100, 180, 255);
}

function draw() {
  background(12, 20, 48);

  fill(circleColour);
  noStroke();

  ellipse(width / 2, height / 2, 120, 120);

  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("Click the circle to change its colour", width / 2, height - 25);
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
  }
}
