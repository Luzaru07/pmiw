function mousePressed () {
  // Avanzar pantalla al hacer clic
  pantalla++;
  if (pantalla > 7) {
    pantalla = 0; // vuelve al inicio
  }
}

function pantallaInicio() {
  push();
  fill(255);
  text("Pantalla 0: Inicio", width/2, height/2);
  textSize(25);
  text("Haz clic para empezar", width/2, height/2 + 40);
  pop();
}

function pantalla1() {
  push();
  image (img1, 0, 0, width, height);
  fill(255);
  textSize(28);
  text("Pantalla 1: Encuentro con Alecto", width/2, height/2);
  pop();
}

function pantalla2() {
  push();
  image (img2, 0, 0, width, height);
  fill(255);
  text("Pantalla 2: Desafio, Aceptar o Rechazar", width/2, height/2);
  pop();
}

function pantalla3() {
  push();
  image (img3, 0, 0, width, height);
  fill(255);
  text("Pantalla 3: Rechaza y pelea", width/2, height/2);
  textSize(25);
  text("Haz clic para continuar", width/2, height/2 + 40);
  pop();
}

function pantalla4() {
  push();
  fill(0);
  text("Rechaza y pelea", width/2, height/2);
  textSize(25);
  text("Haz clic para continuar", width/2, height/2 + 40);
  pop();
}

function pantalla5() {
  push();
  fill(255);
  text("pantalla 5", width/2, height/2);
  textSize(20);
  pop();
}
function pantalla6() {
  push();
  fill(255);
  text("pantalla 6", width/2, height/2);
  textSize(20);
  pop();
}
function pantallaCréditos() {
  push();
  fill(0);
  textSize(35);
  text("CRÉDITOS", width/2, height/4);
  textSize(30);
  text("Fin de la Aventura", width/2, height/2 - 40);
  textSize(20);
  text("Producido por:", width/2, height/2 + 30);
  textSize(23);
  text("Luz Rodríguez Calderón (122866/2) ", width/2, height/2 + 70);
  text("y Valentín San Román Ignacio ()", width/2, height/2 + 100);
  pop();
}
