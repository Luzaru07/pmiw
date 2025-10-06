let DEBUG = true; //cambiar a false al finalizar
let pantalla = 0; // 0 = inicio, 7 = créditos
//let img0, img1, img2, img3, img4; q quede de recuerdo...
let img = [];

function preload () {
  /*
  img0[0] = loadImage ("data/imagen0.jpg");
  //loadSound(), loadFont()...
  */
  for ( let i=0; i<5; i++ ) {
  img[i] = loadImage ("./data/imagen"+i+".jpg"); //+i+ = +nf(i,2)+
  }
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
  if ( DEBUG ) {
  push();
  fill (0);
  textAlign(LEFT); //Derecha
  textSize(20);
  text( "Pantalla:" + pantalla, 20, 20);
  pop();
  }
}
