//Luz Rodríguez Calderón
//Comisión 3 David Bedoian
//video de youtube:

/*
profe por alguna razón no carga el dibujo y no pude 
arreglarlo, asimismo me disculpo por no incluir el video
actualización: faltaba llamar a la función 'modulo' y 
agregar + 400 para la grilla (en mi caso lo hice así)
ahora no cambia el color sin importar donde se encuentre
el mouse :/ espero encontrar y resolver el problema pronto
*/
let c1; //azul
let c2; //negro
//cantidad de cuadrados y circulos
let cantA = 3;
let cantB = 3;
let img;

function preload () {
  img = loadImage ("assets/a.jpeg");
}


function setup() {
  createCanvas (800,400);
  c1 = color(37, 40, 183); //azul
  c2 = color(0); //negro
}


function draw() {
  background (255);
  // función de retorno verdadero o falso
function posicionMouse () {
  return mouseX >= width/2;
}

  if (posicionMouse()) {
    c1 == color(0);
    c2 == color(37, 40, 183);
  } else {
    c1 == color(37, 40, 183);
    c2 == color(0);
}
  for (let a=0; a<cantA; a++ ) {
    for (let b=0; b<cantB; b++ ) {
      let ancho = 400/cantA;
      let alto = 400/cantB;
       image (img, 0, 0, 400, 400);
      modulo( a*ancho+400, b*alto, ancho, alto, a, b);
    }
  }
}
function keyPressed(){
  reiniciar ();
}
