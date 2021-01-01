var song;
var sliderVol;
var sliderRate;
var sliderPan;
var button;
var ampV;
var vol2;
var vol;
var playing=false;
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 50.0; // Height of wave
let period = 200.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

function setup() {
  createCanvas(710, 400);
  song = loadSound("music/hw.mp3",loaded);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  
	// 
  createElement('br')
  createElement('br')
  button = createButton("Loading...");
  button.mousePressed(togglePlaying)


  createElement('br')
  createDiv("Volume")
  sliderVol = createSlider(0,1,.69,.01);
  sliderVol.addClass("w-25")
  createDiv("Playback Speed")
  sliderRate = createSlider(0,2,1,.01);
  createDiv("L..........R")
  sliderPan = createSlider(-1,1,0,.01);
  createDiv()
  ampV = new p5.Amplitude(); //for visualizing
  colorMode(HSB);
  fft = new p5.FFT(0.8,64);
  w = width/64

}

function draw() {
  background(255);
  calcWave();
  renderWave();
  song.setVolume(sliderVol.value())
  song.pan(sliderPan.value())
  song.rate(sliderRate.value())
  
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  var vol2 = ampV.getLevel()
  theta += vol2/1.5;
  var spectrum = fft.analyze();
  // For every x value, calculate a y value with sine function
  let x = theta;
  
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude*vol2;
    x += dx;
  }
}
function loaded() {
	button.html("PLAY")
}
function togglePlaying() {
	if (!song.isPlaying()){
		song.play()
		button.html("PAUSE")
	} else {
		song.pause()
		button.html("PLAY")
	}
}

function renderWave() {
  noStroke();
  fill("#FFA500");
  var vol = ampV.getLevel()
  var spectrum = fft.analyze();
  background(255/vol);
  stroke(240/vol,76,76)
  strokeWeight((4*vol)+1)
  for (let x = 0; x < yvalues.length; x++) {
  	fill("rgb(249,120,55)");
    ellipse(x * xspacing, height / 2 + yvalues[x] , 15, (30*vol)+12);
    fill("rgb(247,163,62)");
    ellipse(x * xspacing, (height+6) / 2 + yvalues[x] + spectrum[x]/20, 18, (30*vol)+12);
    fill("rgb(250,205,56)");
    ellipse(x * xspacing, (height+12) / 2 + yvalues[x] + spectrum[x]/10, 18, (30*vol)+12);
    fill("rgb(249,205,56)");
    ellipse(x * xspacing, (height+18) / 2 + yvalues[x] + spectrum[x]/7, 18, (30*vol)+12);
    fill("rgb(243,161,70)");
    ellipse(x * xspacing, (height+24) / 2 + yvalues[x] + spectrum[x]/5, 18, (30*vol)+12);
    fill("rgb(232,99,86)");
    ellipse(x * xspacing, (height+30) / 2 + yvalues[x] + spectrum[x]/4, 18, (30*vol)+12);
    fill("rgb(232,99,86)");
    ellipse(x * xspacing, (height+36) / 2 + yvalues[x] + spectrum[x]/3.3, 18, (30*vol)+12);
    fill("rgb(228,55,119)");
    ellipse(x * xspacing, (height+42) / 2 + yvalues[x] + spectrum[x]/2.8, 18, (30*vol)+12);
  }
}
