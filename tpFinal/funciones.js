function mousePressed () {
  if (mouseX, mouseY) {
    sonidoClick.play(); //sonido al dar click
  }
  if (dist (mouseX, mouseY, 60, 40) <30) {
    //solo si quiero que suene cuando
    // clickeo el botón de sonido:
    //sonidoClick.play();

    //Boton de sonido:
    if ( sonidoAmbiente.isPlaying() ) {
      sonidoAmbiente.pause();
    } else {
      sonidoAmbiente.loop();
    }
  }
  
  
  if (dist (mouseX, mouseY, 0, 0) <1) {
    pantalla++;
    if (pantalla > 8) {
      pantalla = 0; //vuelve al inicio
    }
  }
  
  
    // Botón "Anterior"
  if (mouseX > 20 && mouseX < 120 && mouseY > height - 60 && mouseY < height - 20) {
    pantalla = max(0, pantalla - 1);
  }

  // Botón "Siguiente"
  if (mouseX > width - 120 && mouseX < width - 20 && mouseY > height - 60 && mouseY < height - 20) {
    pantalla = min(8, pantalla + 1);
  }
}

function pantallaInicio() {
  push();
  image (img[0], 0, 0, width, height);
  fill(255);
  textSize(25);
  text("INICIO", width/2, height/2);
  pop();
}
function pantalla1() {
  push();
  image (img[1], 0, 0, width, height);
  fill(255);
  textSize(18);
  text("Kratos se encuentra solo...", width/2, 40);
  pop();
}
function pantalla2() {
  push();
  image (img[2], 0, 0, width, height);
  fill(13, 95, 255);
  textSize(18);
  text("Hola... kratos...", 160, 150);
  text("fantasma de esparta,", 160, 170);
  text("tengo una oferta para ti", 165, 190);
  pop();
}
function pantalla3() {
  push();
  image (img[3], 0, 0, width, height);
  fill(255);
  text("te concedo el  honor", width/2 + 100, 100);
  text("de convertirte en mi siervo", width/2 + 100, 100);
  text("de convertirte en mi siervo", width/2 + 100, 100);
  pop();
}
function pantalla4() {
  push();
  image (img[4], 0, 0, width, height);
  fill(255);
  text("Al aceptar se convierte en su siervo", width/2, 40);
  pop();
}
function pantalla5() {
  push();
  image (img[5], 0, 0, width, height);
  fill(255);
  textSize(20);
  text("Al rechazar se enfrenta a una pelea con Alecto y los lobos", width/2 + 50, 40);
  pop();
}
function pantalla6() {
  push();
  image (img[6], 0, 0, width, height);
  fill(255);
  text("Pelea por su vida", width/2, 40);
  textSize(20);
  pop();
}
function pantalla7() {
  push();
  image (img[7], 0, 0, width, height);
  fill(255);
  text("pantalla 6", width/2, height/2);
  textSize(20);
  pop();
}
function pantallaCreditos() {
  push();
  fill(0);
  textSize(35);
  text("CRÉDITOS", width/2, height/4);
  textSize(30);
  text("Fin de la Aventura", width/2, height/2 - 40);
  textSize(20);
  text("Producido por:", width/2, height/2 + 30);
  textSize(23);
  text("Luz Rodríguez Calderón (47.953.614) ", width/2, height/2 + 70);
  text("y Valentín San Román Ignacio (45.908.478)", width/2, height/2 + 100);
  pop();
}

function dibujarBotones(){
  //Botón anterior
    fill(180);
  rect(20, height - 60, 100, 40, 10);
  fill(0);
  textSize(18);
  text("Anterior", 70, height - 40);

  // Botón siguiente
  fill(180);
  rect(width - 120, height - 60, 100, 40, 10);
  fill(0);
  text("Siguiente", width - 70, height - 40);
}
