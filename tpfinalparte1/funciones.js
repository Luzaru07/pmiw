function mousePressed () {
  if (mouseX, mouseY) {
    sonidoClick.play(); //sonido al dar click
  }
  if (dist (mouseX, mouseY, 40, 60) <30) {
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
    if (pantalla > 10) {
      pantalla = 0; //vuelve al inicio
    }
    
  }
  
  
    // Botón "Anterior"
  if (mouseX > 20 && mouseX < 120 && mouseY > height - 60 && mouseY < height - 20) {
    pantalla = max(0, pantalla - 1);
  }

  // Botón "Siguiente"
  if (mouseX > width - 120 && mouseX < width - 20 && mouseY > height - 60 && mouseY < height - 20) {
    pantalla = min(11, pantalla + 1);
    if (pantalla === 11) {
      pantalla = 0
    }
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
  text("Kratos se encuentra solo", width/2, 30);
  text("en medio del bosque...", width/2, 50)
  pop();
}
function pantalla2() {
  push();
  image (img[2], 0, 0, width, height);
  fill(13, 95, 255);
  textSize(18);
  text("Hola... kratos...", width/2 + 135, 100); //160, 150
  text("fantasma de esparta,", width/2 + 135, 120); //160, 170
  text("tengo una oferta para ti", width/2 + 135, 140); //165, 190
  fill(255);
  textSize(25);
  text("...", width/2 + 30, height/2 - 60);
  pop();
}
function pantalla3() {
  push();
  image (img[3], 0, 0, width, height);
  fill(13, 95, 255);
  textSize(18);
  text("te concedo el  honor", 160, 150); //width/2 + 130, 100
  text("de convertirte en mi siervo", 160, 170); //width/2 + 130, 120
  text("que dices, una buena oferta no?", 165, 190); //width/2 + 130, 140
  pop();
}
function pantalla4() {
  push();
  image (img[4], 0, 0, width, height);
  fill(255);
  text("Final A:", width/2, 20);
  text("se convierte en su siervo", width/2, 40);
  text("y vuelve a ser un dios de la destrucción", width/2, 60);
  pop();
}
function pantalla5() {
  push();
  image (img[5], 0, 0, width, height);
  fill(255);
  textSize(20);
  text("Al rechazar se enfrenta a una", width/2, 30);
  text("pelea con Alecto y las sombras", width/2, 50);
  pop();
}
function pantalla6() {
  push();
  image (img[6], 0, 0, width, height);
  textSize(20);
  pop();
}
function pantalla7() {
  push();
  image (img[7], 0, 0, width, height);
  fill(255);
  text("Ante un ataque potente, debe decidir", width/2, 30);
  text("que le conviene más: esquivar o bloquear", width/2, 50);
  textSize(20);
  pop();
}
function pantalla8() {
  push();
  image (img[8], 0, 0, width, height);
  fill(255);
  //
  text("Final B:", width/2, 20);
  text("Mata a las sombras y graba su juramento:", width/2, 40);
  text("'Nunca más esclavo de mi pasado'", width/2, 60);
  textSize(20);
  pop();
}
function pantalla9() {
  push();
  image (img[9], 0, 0, width, height);
  fill(255);
  text("Las sombras lo abruman, cayendo como", width/2, 30);
  text("un guerrero derrotado, pero libre.", width/2, 50);
  textSize(20);
  pop();
}
function pantallaCreditos() {
  push();
  image (img[10], 0, 0, width, height);
  fill(255);
  textSize(35);
  text("CRÉDITOS", width/2, height/4 - 50); //nada
  textSize(30);
  text("Fin de la Aventura", width/2, height/2 - 90); // - 40
  textSize(20);
  text("Producido por:", width/2, height/2 - 20); // + 30
  textSize(23);
  text("Luz Rodríguez Calderón (47.953.614) ", width/2, height/2 + 20); // + 70
  text("y Valentín San Román Ignacio (45.908.478)", width/2, height/2 + 50); // + 100
  text("Soundtrack: Oblivion: 'Defending the Gate'", width/2, height/2 + 80); // + 120
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
  
  //Botón para activar y/o pausar la música
  fill (180);
  ellipse (40, 60, 60, 60); //80, 50
  fill (255);
  text ("Música", 40, 20);
}
