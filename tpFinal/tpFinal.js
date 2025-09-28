let pantalla = 0; // 0 = inicio, 1 = juego, 2 = créditos, 3 = fin
let img1;
let img2;
let img3;

function preload () {
  img1 = loadImage ("data/imagen1.jpg");
  img2 = loadImage ("data/imagen2.jpg");
  img3 = loadImage ("data/imagen3.jpg");
}


function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  textSize(32);
}



function draw() {
  background(220);
  
  if (pantalla === 0) {
    // Pantalla de inicio
    background(50, 100, 200);
    image (img1, 0, 0, width, height);
    fill(255);
    text("Pantalla 0: Inicio", width/2, height/2);
    textSize(16);
    text("Haz clic para ir a la siguiente", width/2, height/2 + 40);
    
  } else if (pantalla === 1) {
    // Pantalla del juego
    background(200, 50, 50);
    image (img2, 0, 0, width, height);
    fill(255);
    textSize(32);
    text("Pantalla 1: Juego", width/2, height/2);
    
  } else if (pantalla === 2) {
    // Pantalla de créditos
    background(50, 200, 100);
    image (img3, 0, 0, width, height);
    fill(0);
    text("Pantalla 2: Créditos", width/2, height/2);
    
  } else if (pantalla === 3) {
    // Pantalla de fin
    background(0);
    fill(255);
    text("Pantalla 3: Fin", width/2, height/2);
    textSize(16);
    text("Haz clic para volver al inicio", width/2, height/2 + 40);
  }
}

function mousePressed() {
  // Avanzar pantalla al hacer clic
  pantalla++;
  if (pantalla > 3) {
    pantalla = 0; // vuelve al inicio
  }
}
