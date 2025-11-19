// =========================================
//  MISIÓN ESTELAR
//  Créditos originales: Valentín San Román y Luz Calderón
//  Url: https://youtu.be/hvHYH2fSdfY
// =========================================

// ---- Recursos (imagenes y sonidos) ----
let musicaFondo, sonidoDisparo, sonidoExplosion;
let imgFondo, imgNave, imgAsteroide, imgHeart;
let juego;

function preload() {
  musicaFondo = loadSound("./data/musica.mp3");
  sonidoDisparo = loadSound("./data/disparo.wav");
  sonidoExplosion = loadSound("./data/explosion.wav");


  imgFondo = loadImage("./data/fondo.jpg");
  imgNave = loadImage("./data/nave.png");
  imgAsteroide = loadImage("./data/asteroide.png");
  imgHeart = loadImage("./data/heart.jpg");
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
