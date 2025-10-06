let pantalla = 0; // 0 = inicio, 1 = juego, 2 = créditos, 3 = fin
let img1, img2, img3,img4;

function preload () {
  img1 = loadImage ("data/imagen1.jpg");
  img2 = loadImage ("data/imagen2.jpg");
  img3 = loadImage ("data/imagen3.jpg");
  img4 = loadImage ("data/imagen4.jpg");
  //loadSound(), loadFont()...
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
    pantallaInicio();
    
  } else if (pantalla === 1) {
    // Pantalla del juego
    background(0);
    pantalla1();
    
  } else if (pantalla === 2) {
    // Pantalla 
    background(0);
    pantalla2();
    
  } else if (pantalla === 3) {
    // Pantalla de fin
    background(0);
    pantalla3();
    
  } else if (pantalla === 4) {
    // Pantalla de fin
    background(255);
    pantalla4();
    
  } else if (pantalla === 5) {
    // Pantalla de fin
    background(148, 224, 18); //verde
    pantalla5();
    
  } else if (pantalla === 6) {
    // Pantalla de fin
    background(250, 91, 141); //rosa
    pantalla6();
    
  } else if (pantalla === 7) { //CRÉDITOS
    // Pantalla de fin
    background(255, 192, 54); //naranja
    pantallaCréditos(); 
  }
}
