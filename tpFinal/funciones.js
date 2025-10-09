function mousePressed () {
  /*
  // Avanzar pantalla al hacer clic
  pantalla++;
  if (pantalla > 8) {
    pantalla = 0; // vuelve al inicio
  }
  */
  if (mouseX, mouseY) {
    sonidoClick.play(); //sonido al dar click
  }

  if (dist (mouseX, mouseY, 60, 40) <30) {
    //sonidoClick.play();

    //click para iniciar la música
    if ( sonidoAmbiente.isPlaying() ) {
      sonidoAmbiente.pause();
    } else {
      sonidoAmbiente.loop();
    }
  }

  if (dist (mouseX, mouseY, 320, 400) <30) {
    pantalla++;
    if (pantalla > 8) {
      pantalla = 0; //vuelve al inicio
    }
  }
}

function pantallaInicio() {
  push();
  image (img[0], 0, 0, width, height);
  fill(255);
  text("Pantalla 0: Inicio", width/2, height/2);
  textSize(25);
  text("Haz clic para empezar", width/2, height/2 + 40);
  ellipse(320, 400, 100, 50); //Botón pa continuar
  pop();
}

function pantalla1() {
  push();
  image (img[1], 0, 0, width, height);
  fill(255);
  textSize(28);
  text("Kratos se encuentra solo", width/2, height/2);
  pop();
}

function pantalla2() {
  push();
  image (img[2], 0, 0, width, height);
  fill(255);
  textSize(28);
  text("Aparece Alecto y charlan", width/2, height/2);
  pop();
}

function pantalla3() {
  push();
  image (img[3], 0, 0, width, height);
  fill(255);
  text("Alecto le ofrece un trato, ¿Aceptar o Rechazar?", width/2, height/2);
  ellipse(200, 400, 100, 50); //Botón1
  ellipse(320, 400, 100, 50); //Botón2
  pop();
}

function pantalla4() {
  push();
  image (img[4], 0, 0, width, height);
  fill(255);
  text("Decide rechazar y la pelea comienza", width/2, height/2);
  textSize(25);
  text("Haz clic para continuar", width/2, height/2 + 40);
  pop();
}

function pantalla5() {
  push();
  image (img[5], 0, 0, width, height);
  fill(0);
  text("Rechaza y pelea", width/2, height/2);
  textSize(25);
  text("Haz clic para continuar", width/2, height/2 + 40);
  pop();
}

function pantalla6() {
  push();
  fill(255);
  text("pantalla 5", width/2, height/2);
  textSize(20);
  pop();
}
function pantalla7() {
  push();
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
  text("y Valentín San Román Ignacio ()", width/2, height/2 + 100);
  pop();
}
