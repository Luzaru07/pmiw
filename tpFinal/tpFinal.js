let DEBUG = true; //cambiar a false al finalizar
let pantalla = 0; // 0 = inicio, 7 = créditos
let img = [];
let sonidoAmbiente;
let sonidoClick;

function preload () {
  //img0[0] = loadImage ("data/imagen0.jpg");
  //loadSound(), loadFont()...
  for ( let i=0; i<6; i++ ) {
    img[i] = loadImage ("./data/imagen"+i+".jpg"); //+i+ = +nf(i,2)+ si es más de 2 cifras
  }
  sonidoAmbiente = loadSound("./data/sonidoAmbiente.mp3");
  sonidoClick = loadSound("./data/sonidoClick.mp3");
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
    background(53);
    pantalla1();
    
  } else if (pantalla === 2) {
    background(0);
    pantalla2();
    
  } else if (pantalla === 3) {
    background(0);
    pantalla3();
    
  } else if (pantalla === 4) {
    background(0);
    pantalla4();
    
  } else if (pantalla === 5) {
    background(255);
    pantalla5();
    
  } else if (pantalla === 6) {
    background(148, 224, 18); //verde
    pantalla6();
    
  } else if (pantalla === 7) {
    background(250, 91, 141); //rosa
    pantalla7();
    
  } else if (pantalla === 8) {
    //CRÉDITOS
    background(255, 192, 54); //naranja
    pantallaCreditos();
  }
  
  fill (207, 8, 252);
  ellipse (60, 40, 80, 50); //Botón para activar y/o pausar la música

  if ( sonidoAmbiente.isPlaying() ) {
    let paneo = map(mouseX, 0, width, -1, 1);
    paneo = constrain (paneo, -1, 1);
    sonidoAmbiente.pan( paneo );
    //console.log( paneo );
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
