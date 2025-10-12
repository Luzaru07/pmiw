let DEBUG = true; //cambiar a false al finalizar
let pantalla = 0; // 0 = inicio, 8 = créditos
let img = [];
let sonidoAmbiente;
let sonidoClick;

function preload () {
  //loadSound(), loadFont()...
  for ( let i=0; i<10; i++ ) {
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
    pantalla1();
  } else if (pantalla === 2) {
    pantalla2();
  } else if (pantalla === 3) {
    pantalla3();
  } else if (pantalla === 4) {
    pantalla4();
  } else if (pantalla === 5) {
    pantalla5();
  } else if (pantalla === 6) {
    pantalla6();
  } else if (pantalla === 7) {
    pantalla7();
  } else if (pantalla === 8) {
    pantallaCreditos();
  }
  
  //Botón para activar y/o pausar la música
  fill (207, 8, 252);
  ellipse (60, 40, 80, 50);
  
  /*
  if ( sonidoAmbiente.isPlaying() ) {
    let paneo = map(mouseX, 0, width, -1, 1);
    paneo = constrain (paneo, -1, 1);
    sonidoAmbiente.pan( paneo );
    //console.log( paneo );
  }
  */
  
  if ( DEBUG ) {
    push();
    fill (0);
    textAlign(LEFT); //Derecha
    textSize(20);
    text( "Pantalla:" + pantalla, 20, 20);
    pop();
  }
  
  dibujarBotones();
}
