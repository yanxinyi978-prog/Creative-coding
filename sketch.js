let balls = [];
let music;
let analyzer;

const numberOfBalls = 24;

function preload() {

  music = loadSound("beat.mp3");
}

function setup() {
  const canvas = createCanvas(
    max(200, windowWidth - 32),
    max(320, windowHeight * 0.55)
  );

  canvas.parent("canvas-holder");

  describe(
    "Colourful circles bounce around a dark blue canvas. Their sizes react to music volume. Clicking the canvas changes their colours and speeds."
  );

  // Analyse the volume of the music.
  analyzer = new p5.Amplitude();
  analyzer.setInput(music);

  // Create the bouncing circles.
  for (let i = 0; i < numberOfBalls; i++) {
    balls.push(new Ball());
  }

  const button = document.getElementById("music-button");
  const status = document.getElementById("music-status");

  button.addEventListener("click", async function () {
    try {
      await userStartAudio();

      if (music.isPlaying()) {
        music.pause();

        button.textContent = "Play Music";
        status.textContent = "Music is paused.";
      } else {
        music.loop();

        button.textContent = "Pause Music";
        status.textContent = "Music is playing.";
      }
    } catch (error) {
      status.textContent =
        "Audio could not start. Please check the music file and try again.";

      console.error("Audio playback error:", error);
    }
  });
}

function draw() {
  background(12, 20, 48);


  const volume = analyzer.getLevel();

  for (let ball of balls) {
    ball.move();
    ball.bounce();
    ball.display(volume);
  }
}

function mousePressed() {
  
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    for (let ball of balls) {
      ball.change();
    }
  }
}

function windowResized() {
  
  resizeCanvas(
    max(200, windowWidth - 32),
    max(320, windowHeight * 0.55)
  );


  for (let ball of balls) {
    ball.x = constrain(ball.x, 0, width);
    ball.y = constrain(ball.y, 0, height);
  }
}

class Ball {
  constructor() {
    this.x = random(width);
    this.y = random(height);

    this.diameter = random(14, 36);

    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);

    this.colour = color(
      random(100, 256),
      random(100, 256),
      random(150, 256)
    );
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  bounce() {
    const radius = this.diameter / 2;

    // Bounce against the left and right edges.
    if (
      this.x < radius ||
      this.x > width - radius
    ) {
      this.xSpeed *= -1;

      this.x = constrain(
        this.x,
        radius,
        width - radius
      );
    }

    if (
      this.y < radius ||
      this.y > height - radius
    ) {
      this.ySpeed *= -1;

      this.y = constrain(
        this.y,
        radius,
        height - radius
      );
    }
  }

  display(volume) {
    noStroke();
    fill(this.colour);

    const pulse = volume * 180;
    const size = this.diameter + pulse;

    circle(this.x, this.y, size);
  }

  change() {
    this.colour = color(
      random(100, 256),
      random(100, 256),
      random(150, 256)
    );


    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);

   
    if (abs(this.xSpeed) < 1) {
      this.xSpeed = 2;
    }

    if (abs(this.ySpeed) < 1) {
      this.ySpeed = -2;
    }
  }
}
