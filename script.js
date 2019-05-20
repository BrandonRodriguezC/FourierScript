let time = 0;
let wave = [];
let fourierX = [];
let fourierY = [];
let estado = false;
let vectorX = [];
let vectorY = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //  fourier=transformadaFourierDiscreta(prueba);
}

function mousePressed() {
  estado = false;
  vectorX = [];
  vectorY = [];
}

function mouseReleased() {
  estado = true;
  fourierX = transformadaFourierDiscreta(vectorX);
  fourierY = transformadaFourierDiscreta(vectorX);
}

function draw() {
  background(255, 204, 0);

  if (estado == false) {
    vectorX.push(mouseX);
    vectorY.push(mouseY);

  } else {

    let puntosX = circulos(100, 100, 0,fourierX);
    let puntosY = circulos(100, 100, HALF_PI, fourierY);
    let puntos = createVector(puntosX.x, puntosY.y);
    wave.unshift(puntos);
    translate(200, 0);

    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
      vertex(wave[i].x, wave[i].y);
    }
    endShape();

    time += TWO_PI / fourierY.length;

    if (time > TWO_PI) {
      time = 0;
      wave = [];
  }
  }
}

function circulos(x, y, rotacion,fourier) {

  for (let i = 0; i < fourier.length; i++) {
    let xAnterior = x;
    let yAnterior = y;

    let radio = fourier[i].amplitud;
    let periodo = fourier[i].periodo;
    let angulo = fourier[i].angulo;
    x += radio* cos(periodo * time + angulo+rotacion);
    y += radio * sin(periodo * time + angulo+rotacion);

    stroke(0, 100);
    noFill();
    ellipse(xAnterior, yAnterior, radio * 2);

    fill(0);
    stroke(0);
    line(xAnterior, yAnterior, x, y);
    ellipse(x, y, 8);
  }
  return createVector(x, y);
}


function transformadaFourierDiscreta(x) {
  var X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    var real = 0;
    var imaginaria = 0;
    for (let n = 0; n < N; n++) {
      var tetha = (TWO_PI * k * n) / N;
      real += x[n] * cos(tetha);
      imaginaria -= x[n] * sin(tetha);
    }
    real = real / N;
    imaginaria = imaginaria / N;
    var periodo = k;
    var amplitud = sqrt(real * real + imaginaria * imaginaria);
    var angulo = atan2(imaginaria, real);
    X[k] = {
      real,
      imaginaria,
      periodo,
      amplitud,
      angulo
    };
  }
  return X;
}