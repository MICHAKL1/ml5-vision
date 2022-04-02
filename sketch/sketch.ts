let sound: p5.SoundFile; // to use p5 sound
declare function loadSound(path: string): p5.SoundFile; // a hack to get loadSound working with typescript
declare let ml5: any; // to use ml5 (no ml5 types available)
let qr; // when using qr code generator
let tracker; // when using face tracking
let capture: Capture;
 
let mobilenet:any;
let classifier: any;
let predictions: any[] = [];
 
let happySound: p5.SoundFile;
let scaredSound: p5.SoundFile;
let happyImage: p5.Image;
let scaredImage: p5.Image;
let currentImage: p5.Image;
 
function readyToTrain() {
  console.log("Model is ready to be trained")
}
 
function videoReady() {
  console.log("Video is ready")
}
 
function classify() {
  classifier.classify(gotResults)
}
 
function gotResults(error: any, results: any) {
  if (error) {
    console.error(error);
    return;
  }
  predictions = results;
 
  if (predictions[0].confidence > 0.85) {
    switch (predictions[0].label) {
      case 'happy':
        happySound.play();
        currentImage = null;
        //currentImage = happyImage;
        break;
      case 'sad':
        scaredSound.play();
        currentImage = null;
        //currentImage = scaredImage;
        break;
      case 'normal':
        currentImage = null;
        break;
      default:
        console.error('Unhandled label ' + predictions[0].label);
    }
  }
 
  setTimeout(classify, 1000)
}
 
function whileTraining(loss?: number) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}
 
// P5 will call this function to preload any assets (sounds, sprites, etc) and will continue with setup only when finished
function preload() {
   happySound = loadSound('assets/happy.mp3');
   scaredSound = loadSound('assets/scared.mp3');
   happyImage = loadImage('assets/happy.png');
    scaredImage = loadImage('assets/scared.png')
 
}
 
async function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  createCanvas(640, 480);
  frameRate(10);
  capture = createCapture(VIDEO);
  capture.size(640,480);
  capture.hide();
 
  mobilenet = ml5.featureExtractor('MobileNet', readyToTrain);
  mobilenet.config.numLabels = 3 ; // predmet A, predmet B a nic
  classifier = mobilenet.classification(capture, videoReady);
 
  const happyButton = createButton('happy');
  happyButton.mousePressed(function () {
    classifier.addImage('happy');
  });
 
  const sadButton = createButton('sad')
  sadButton.mousePressed(function () {
    classifier.addImage('sad');
  });
 
  const normalButton = createButton('normal')
  normalButton.mousePressed(function () {
    classifier.addImage('normal');
  });
 
  const trainButton = createButton('train')
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });
}
 
// P5 will run this function whenever window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
 
// P5 will run this function several times per second (depending on frameRate)
function draw() {
 clear();
 image(capture,0,0);
 if (predictions[0]) {
   text(predictions[0].label + ' - ' + Math.floor(predictions[0].confidence * 100) + '%', 5, 20);
 }
 if (currentImage) {
  image(currentImage, 0, 0);
}
}
 
 

