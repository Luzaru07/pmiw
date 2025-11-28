// =========================================
//  MISIÓN ESTELAR
//  Créditos originales: Valentín San Román y Luz Calderón
//  Url: https://youtu.be/hvHYH2fSdfY
// =========================================

// ---------- Recursos ----------
let sndMusica, sndDisparo, sndExplosion;
let imgFondo, imgNave, imgAsteroide, imgVida;
let juego;

function preload() {
  sndMusica = loadSound("./data/musica.mp3");
  sndDisparo = loadSound("./data/disparo.wav");
  sndExplosion = loadSound("./data/explosion.wav");


  imgFondo = loadImage("./data/fondo.jpg");
  imgNave = loadImage("./data/nave.png");
  imgAsteroide = loadImage("./data/asteroide.png");
  imgVida = loadImage("./data/vida.jpg");
}

// -----------------------------------------
function setup() {
  createCanvas(640, 480);
  juego = new Juego();
}

// -----------------------------------------
function draw() {
    background(5, 5, 20); 
   if (imgFondo) {
    image(imgFondo, 0, 0, width, height);
  } else {
    background(5, 5, 20);
  }
  textFont('monospace');
  juego.mostrar();
  juego.actualizar();
}

// -----------------------------------------
function keyPressed() {
  if (juego) juego.teclaPresionada(keyCode);
}
function keyReleased() {
  if (juego) juego.teclaSoltada(keyCode);
}
function mousePressed() {
  if (juego) juego.click(mouseX, mouseY);
}

// -----------------------------------------
