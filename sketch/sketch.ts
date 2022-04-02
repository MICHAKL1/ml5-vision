let sound: p5.SoundFile; // to use p5 sound
declare function loadSound(path: string): p5.SoundFile; // a hack to get loadSound working with typescript
declare let ml5: any; // to use ml5 (no ml5 types available)
let qr; // when using qr code generator
let tracker; // when using face tracking
let capture: Capture;

// P5 will call this function to preload any assets (sounds, sprites, etc) and will continue with setup only when finished
function preload() {
  // sound = loadSound('assets/ding.mp3');
}

async function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  createCanvas(windowWidth, windowHeight);
  // qr = qrcode(4, 'L');
  // tracker = new clm.tracker();
  // await ml5. ....
  // sound.play();
  // capture = createCapture(VIDEO);
}

// P5 will run this function whenever window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// P5 will run this function several times per second (depending on frameRate)
function draw() {
  // use Axes helper for creating objects on screen
  Axes.draw(0, 0, true); // true - translate to middle of axes
  //Axes.draw(windowWidth / 2, windowHeight / 2, false); // true - do not translate to middle of axes
  textSize(40);
  fill(0, 0, 255, 2);
  textAlign(CENTER);
  text("Welcome to P5js 🚀", windowWidth / 2, windowHeight / 2);
}
