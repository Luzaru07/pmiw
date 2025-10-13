/*
Luz Rodríguez Calderón
Comisión 3 
Url: 
Pido disculpas a mi compañero y al profesor por el retraso en mi entrega
*/

let DEBUG = false; //cambiar a false al finalizar
let pantalla = 0; // 0 = inicio, 8 = créditos
let img = [];
let sonidoAmbiente;
let sonidoClick;

function preload () {
  //loadSound(), loadFont()...
  for ( let i=0; i<11; i++ ) {
    img[i] = loadImage ("./data/imagen"+nf(i,2)+".jpg"); //+i+ = +nf(i,2)+ si es más de 2 cifras
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
    pantalla8();
    } else if (pantalla === 9) {
    pantalla9();
  } else if (pantalla === 10) {
    pantallaCreditos();
  }
  
  dibujarBotones();
  
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
}
