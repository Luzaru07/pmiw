// MISIÓN ESTELAR - Versión final con MENÚ ANIMADO (hover) y animación de victoria
// Créditos: Valentín San Román y Luz Rodríguez Calderón
// 100% p5.js - sin sonido

let juego;
let estrellas = [];

function setup() {
  createCanvas(800, 500);
  textFont('monospace');
  juego = new Juego();
  for (let i = 0; i < 160; i++) estrellas.push(new Estrella());
  noCursor(); // opcional: muestra un cursor personalizado
}

function draw() {
  background(5, 5, 20);

  // Fondo estrellado (dibujado primero)
  for (let s of estrellas) {
    s.mover();
    s.mostrar();
  }

  juego.mostrar();
  juego.actualizar();

  // cursor pequeño
  push();
  noStroke();
  fill(200);
  ellipse(mouseX, mouseY, 6);
  pop();
}

function keyPressed() {
  juego.teclaPresionada(keyCode);
}

function keyReleased() {
  juego.teclaSoltada(keyCode);
}

function mousePressed() {
  juego.click(mouseX, mouseY);
}

//////////////////////////
// CLASE JUEGO
//////////////////////////
class Juego {
  constructor() {
    this.estado = "menu";
    this.nave = new Nave();
    this.asteroides = [];
    this.balas = [];
    this.puntaje = 0;
    this.vidas = 3;
    this.escudo = 100;
    this.dificultad = "normal";
    this.particulas = []; // partículas para efectos
    this.confetti = []; // confetti victoria

    // botones
    this.botonJugar = new Boton(width / 2 - 90, 220, 180, 46, "Jugar");
    this.botonInstrucciones = new Boton(width / 2 - 90, 280, 180, 42, "Instrucciones");
    this.botonCreditos = new Boton(width / 2 - 90, 330, 180, 42, "Créditos");
    this.botonVolver = new Boton(20, 440, 110, 36, "Volver");
    this.botonesDif = [
      new Boton(width / 2 - 200, 230, 120, 44, "Fácil"),
      new Boton(width / 2 - 60, 230, 120, 44, "Normal"),
      new Boton(width / 2 + 80, 230, 120, 44, "Difícil")
    ];
    this.botonReiniciar = new Boton(width / 2 - 70, height / 2 + 40, 140, 40, "Reiniciar");
  }

  actualizar() {
    if (this.estado === "jugando") {
      this.nave.mover();

      // ajustar frecuencia y recarga segun dificultad
      let freq = this.dificultad === "fácil" ? 80 : this.dificultad === "normal" ? 60 : 40;
      let escudoRec = this.dificultad === "fácil" ? 0.25 : this.dificultad === "normal" ? 0.12 : 0.06;

      if (frameCount % freq === 0) this.asteroides.push(new Asteroide());

      // recarga de escudo (guardada en 0-100)
      this.escudo = min(this.escudo + escudoRec, 100);

      // actualizar balas
      for (let i = this.balas.length - 1; i >= 0; i--) {
        let b = this.balas[i];
        b.mover();
        if (b.fueraDePantalla()) this.balas.splice(i, 1);
      }

      // asteroides: movimiento y colisiones
      for (let i = this.asteroides.length - 1; i >= 0; i--) {
        let a = this.asteroides[i];
        a.mover();

        // colisión bala-asteroide
        let destroyed = false;
        for (let j = this.balas.length - 1; j >= 0; j--) {
          let b = this.balas[j];
          if (dist(b.x, b.y, a.x, a.y) < a.tam / 2) {
            // explosión de partículas
            for (let k = 0; k < 10; k++) this.particulas.push(new Particula(a.x, a.y));
            this.balas.splice(j, 1);
            this.asteroides.splice(i, 1);
            this.puntaje++;
            destroyed = true;
            break;
          }
        }
        if (destroyed) continue;

        // colisión nave-asteroide
        if (this.nave.colision(a)) {
          // aplicar daño reducido por escudo
          const baseDamage = 1.0;
          if (this.escudo > 0) {
            // escudo reduce daño a la mitad y se consume
            let damage = baseDamage * 0.5;
            this.nave.vida -= damage;
            this.escudo -= 40; // consumo por impacto
            if (this.escudo < 0) this.escudo = 0;
          } else {
            this.nave.vida -= baseDamage;
          }

          // partículas de choque en la nave
          for (let k = 0; k < 12; k++) this.particulas.push(new Particula(this.nave.x, this.nave.y));
          this.asteroides.splice(i, 1);

          if (this.nave.vida <= 0) {
            this.estado = "perder";
          }
          continue;
        }

        // si sale de pantalla lo sacamos
        if (a.y > height + a.tam) this.asteroides.splice(i, 1);
      }

      // actualizar partículas
      for (let i = this.particulas.length - 1; i >= 0; i--) {
        this.particulas[i].mover();
        if (this.particulas[i].vida <= 0) this.particulas.splice(i, 1);
      }

      // check win
      if (this.puntaje >= 25) {
        this.estado = "ganar";
        // iniciar confetti
        for (let i = 0; i < 80; i++) this.confetti.push(new Confetti(random(width), random(-200, -20)));
      }
    }

    // animar confetti si hay
    if (this.estado === "ganar") {
      for (let i = this.confetti.length - 1; i >= 0; i--) {
        this.confetti[i].mover();
        if (this.confetti[i].y > height + 20) this.confetti.splice(i, 1);
      }
    }
  }

  mostrar() {
    // HUD y estados
    if (this.estado === "menu") this.menuPrincipal();
    else if (this.estado === "instrucciones") this.pantallaInstrucciones();
    else if (this.estado === "creditos") this.pantallaCreditos();
    else if (this.estado === "dificultad") this.menuDificultad();
    else if (this.estado === "jugando") this.pantallaJuego();
    else if (this.estado === "ganar") this.pantallaGanar();
    else if (this.estado === "perder") this.pantallaPerder();

    // dibujar asteroides y partículas encima/hud
    if (this.estado === "jugando" || this.estado === "ganar" || this.estado === "perder") {
      for (let a of this.asteroides) a.mostrar();
      for (let p of this.particulas) p.mostrar();
    }

    // confetti sobre todo
    if (this.confetti.length > 0) {
      for (let c of this.confetti) c.mostrar();
    }
  }

  click(x, y) {
    if (this.estado === "menu") {
      if (this.botonJugar.click(x, y)) this.estado = "dificultad";
      else if (this.botonInstrucciones.click(x, y)) this.estado = "instrucciones";
      else if (this.botonCreditos.click(x, y)) this.estado = "creditos";
    } else if (this.estado === "dificultad") {
      for (let b of this.botonesDif) {
        if (b.click(x, y)) {
          this.dificultad = b.texto.toLowerCase();
          this.reiniciar();
          this.estado = "jugando";
        }
      }
      if (this.botonVolver.click(x, y)) this.estado = "menu";
    } else if (this.estado === "instrucciones" || this.estado === "creditos") {
      if (this.botonVolver.click(x, y)) this.estado = "menu";
    } else if (this.estado === "jugando") {
      // boton reiniciar pequeño
      if (this.botonReiniciar.click(x, y)) this.reiniciar();
    } else if (this.estado === "ganar" || this.estado === "perder") {
      if (this.botonVolver.click(x, y)) {
        this.estado = "menu";
        this.confetti = [];
      }
    }
  }

  teclaPresionada(keyCode) {
    if (this.estado === "menu") {
      if (keyCode === ENTER) this.estado = "dificultad";
    } else if (this.estado === "jugando") {
      if (keyCode === LEFT_ARROW) this.nave.moverIzquierda = true;
      if (keyCode === RIGHT_ARROW) this.nave.moverDerecha = true;
      if (keyCode === 32) this.balas.push(new Bala(this.nave.x, this.nave.y));
      if (keyCode === 80) { // P para pausar/play rápido (opcional)
        this.estado = "menu";
      }
    } else if ((this.estado === "ganar" || this.estado === "perder") && keyCode === ENTER) {
      this.reiniciar();
      this.estado = "jugando";
    }
  }

  teclaSoltada(keyCode) {
    if (keyCode === LEFT_ARROW) this.nave.moverIzquierda = false;
    if (keyCode === RIGHT_ARROW) this.nave.moverDerecha = false;
  }

  reiniciar() {
    this.nave = new Nave();
    this.asteroides = [];
    this.balas = [];
    this.puntaje = 0;
    this.vidas = 3;
    this.escudo = 100;
    this.particulas = [];
    this.confetti = [];
  }

  // ---------- PANTALLAS ----------
  menuPrincipal() {
    // Título con leve pulso
    push();
    translate(width / 2, 120 + sin(frameCount * 0.02) * 6);
    textAlign(CENTER);
    textSize(42);
    fill(255);
    text("🚀 MISIÓN ESTELAR 🚀", 0, 0);
    pop();

    // Botones (con hover)
    this.botonJugar.mostrarHover();
    this.botonInstrucciones.mostrarHover();
    this.botonCreditos.mostrarHover();

    // Pie
    fill(200);
    textSize(13);
    textAlign(CENTER);
    text("Creado por Valentín San Román y Luz Rodríguez Calderón", width / 2, height - 28);
  }

  menuDificultad() {
    fill(255);
    textAlign(CENTER);
    textSize(26);
    text("Selecciona dificultad", width / 2, 180);

    // botones dificultad con hover
    for (let b of this.botonesDif) b.mostrarHover();

    // volver
    this.botonVolver.mostrarHover();
  }

  pantallaInstrucciones() {
    fill(255);
    textAlign(CENTER);
    textSize(28);
    text("INSTRUCCIONES", width / 2, 110);
    textSize(16);
    text("← → : mover   •   ESPACIO : disparar\nTu escudo reduce el daño a la mitad cuando tiene energía.\nEvitá asteroides y alcanzá 25 puntos para ganar.", width / 2, 220);
    this.botonVolver.mostrarHover();
  }

  pantallaCreditos() {
    fill(255);
    textAlign(CENTER);
    textSize(28);
    text("CRÉDITOS", width / 2, 110);
    textSize(16);
    text("Diseño y programación:\nValentín San Román\nApoyo creativo:\nLuz Canelo", width / 2, 220);
    this.botonVolver.mostrarHover();
  }

  pantallaJuego() {
    // Nave
    this.nave.mostrar();

    // UI: puntaje
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Puntaje: " + this.puntaje, 20, 28);

    // vidas (corazones)
    let vidasEnteras = floor(max(this.nave.vida, 0));
    for (let i = 0; i < 3; i++) {
      if (i < vidasEnteras) fill(255, 0, 0);
      else if (i === vidasEnteras && this.nave.vida - vidasEnteras >= 0.5) fill(255, 140, 0);
      else fill(100);
      heart(20 + i * 30, 55, 10);
    }
    // valor vida numérico
    fill(255);
    textSize(12);
    text("Vida: " + nf(this.nave.vida, 1, 1), 20, 80);

    // barra escudo
    fill(255);
    textSize(12);
    text("Escudo", 20, 105);
    noStroke();
    fill(40);
    rect(20, 110, 150, 12, 6);
    fill(0, 180, 255);
    rect(20, 110, map(this.escudo, 0, 100, 0, 150), 12, 6);

    // boton reiniciar
    this.botonReiniciar.mostrarHover();

    // mostrar balas activas
    for (let b of this.balas) b.mostrar();

    // mostrar asteroides ya lo hace main
  }

  pantallaGanar() {
    // animación confetti se ejecuta en actualizar y mostrar confetti
    fill(0, 255, 100);
    textAlign(CENTER);
    textSize(36);
    text("¡MISIÓN COMPLETA! 🌟", width / 2, height / 2 - 40);

    textSize(18);
    fill(255);
    text("Excelente trabajo, Valentín.", width / 2, height / 2);

    this.botonVolver.mostrarHover();
  }

  pantallaPerder() {
    fill(255, 60, 60);
    textAlign(CENTER);
    textSize(36);
    text("¡MISIÓN FALLIDA 💥!", width / 2, height / 2 - 40);
    textSize(18);
    fill(255);
    text("Intentá de nuevo. Presioná Volver para regresar al menú.", width / 2, height / 2);
    this.botonVolver.mostrarHover();
  }
}

//////////////////////////
// CLASES AUXILIARES
//////////////////////////

class Nave {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.vel = 5.5;
    this.moverIzquierda = false;
    this.moverDerecha = false;
    this.disparos = [];
    this.vida = 3.0; // puede tener medias
    this.anim = 0;
    this.cooldown = 0;
  }

  mover() {
    if (this.moverIzquierda) this.x -= this.vel;
    if (this.moverDerecha) this.x += this.vel;
    this.x = constrain(this.x, 20, width - 20);
    this.anim += 0.14;
    if (this.cooldown > 0) this.cooldown--;
    // actualizar disparos propios
    for (let i = this.disparos.length - 1; i >= 0; i--) {
      this.disparos[i].mover();
      if (this.disparos[i].fueraDePantalla()) this.disparos.splice(i, 1);
    }
  }

  mostrar() {
    push();
    translate(this.x, this.y);
    noStroke();
    // cuerpo
    fill(100, 200, 255);
    ellipse(0, 0, 46, 70);
    // fuego
    fill(255, 160, 0);
    triangle(-14, 30, 14, 30, 0, 54 + sin(this.anim) * 6);
    // cabina
    fill(255);
    ellipse(0, -12, 24, 24);

    // brillo de escudo (si hay)
    let globalEsc = juego.escudo;
    if (globalEsc > 8) {
      noFill();
      stroke(0, 200, 255, map(globalEsc, 0, 100, 20, 160));
      strokeWeight(2);
      ellipse(0, 0, 72 + sin(this.anim) * 4, 96 + sin(this.anim) * 4);
      noStroke();
    }
    pop();

    // mostrar disparos de la nave
    for (let d of this.disparos) d.mostrar();
  }

  disparar() {
    if (this.cooldown <= 0) {
      this.disparos.push(new Disparo(this.x, this.y - 36));
      this.cooldown = 8;
    }
  }

  actualizarDisparos() {
    for (let i = this.disparos.length - 1; i >= 0; i--) {
      this.disparos[i].mover();
      if (this.disparos[i].fueraDePantalla()) this.disparos.splice(i, 1);
    }
  }

  colision(asteroide) {
    let d = dist(this.x, this.y, asteroide.x, asteroide.y);
    return d < (asteroide.tam / 2 + 18);
  }
}

class Bala {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = 11;
  }

  mover() {
    this.y -= this.vel;
  }

  mostrar() {
    noStroke();
    fill(255, 240, 120);
    ellipse(this.x, this.y, 8);
    fill(255, 150, 0, 120);
    ellipse(this.x, this.y + 6, 14, 10);
  }

  fueraDePantalla() {
    return this.y < -10;
  }
}

class Disparo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = 9;
    this.trazo = [];
    this.alpha = 255;
  }

  mover() {
    this.trazo.push({ x: this.x, y: this.y });
    if (this.trazo.length > 12) this.trazo.shift();
    this.y -= this.vel;
    this.alpha -= 6;
  }

  mostrar() {
    // cola luminosa
    noFill();
    stroke(0, 210, 255, this.alpha * 0.9);
    strokeWeight(3);
    beginShape();
    for (let p of this.trazo) vertex(p.x, p.y);
    endShape();

    noStroke();
    fill(0, 210, 255, this.alpha);
    ellipse(this.x, this.y, 8, 16);
  }

  fueraDePantalla() {
    return this.y < -20 || this.alpha <= 0;
  }
}

class Asteroide {
  constructor() {
    this.x = random(30, width - 30);
    this.y = -30;
    this.vel = random(2.5, 5.2);
    this.tam = random(26, 48);
    this.rot = random(TWO_PI);
    this.rotSpeed = random(-0.04, 0.04);
  }

  mover() {
    this.y += this.vel;
    this.rot += this.rotSpeed;
  }

  mostrar() {
    push();
    translate(this.x, this.y);
    rotate(this.rot);
    fill(130);
    noStroke();
    ellipse(0, 0, this.tam, this.tam * 0.86);
    // cráteres
    fill(100);
    ellipse(-this.tam * 0.15, -this.tam * 0.12, this.tam * 0.26);
    ellipse(this.tam * 0.2, this.tam * 0.05, this.tam * 0.22);
    pop();
  }
}

class Estrella {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vel = random(0.3, 1.7);
    this.tam = random(1, 3.2);
    this.brightness = random(180, 255);
  }

  mover() {
    // si el mouse está sobre el centro del menú animamos estrellas más rápido para efecto
    if (juego.estado === "menu" && dist(mouseX, mouseY, width / 2, height / 2) < 200) {
      this.y += this.vel * 1.8;
    } else this.y += this.vel;
    if (this.y > height) {
      this.y = -random(10, 40);
      this.x = random(width);
    }
  }

  mostrar() {
    noStroke();
    fill(this.brightness);
    ellipse(this.x, this.y, this.tam);
  }
}

class Particula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.tam = random(2, 4);
    this.vida = 120;
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;
    this.vida -= 5;
  }

  mostrar() {
    fill(255, 200, 0, map(this.vida, 0, 120, 0, 255));
    noStroke();
    ellipse(this.x, this.y, this.tam);
  }
}

class Confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1.5, 1.5);
    this.vy = random(1, 3);
    this.size = random(4, 8);
    this.col = color(random(100, 255), random(100, 255), random(100, 255));
    this.ang = random(TWO_PI);
    this.spin = random(-0.1, 0.1);
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;
    this.ang += this.spin;
  }

  mostrar() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    noStroke();
    fill(this.col);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size * 0.6);
    pop();
  }
}

class Boton {
  constructor(x, y, w, h, texto) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.texto = texto;
    this.hoverLerp = 0; // para suavizar hover
  }

  mostrarHover() {
    // detectar hover con mouse
    let over = this.isHover(mouseX, mouseY);
    // suavizado
    this.hoverLerp = lerp(this.hoverLerp, over ? 1 : 0, 0.18);

    push();
    translate(this.x, this.y);
    // fondo
    let base = lerpColor(color(60, 60, 100), color(90, 90, 150), this.hoverLerp);
    fill(base);
    noStroke();
    rect(0, 0, this.w, this.h, 10);

    // glow
    if (this.hoverLerp > 0.02) {
      let g = map(this.hoverLerp, 0, 1, 20, 80);
      drawingContext.shadowBlur = g;
      drawingContext.shadowColor = 'rgba(0,200,255,0.6)';
    } else {
      drawingContext.shadowBlur = 0;
    }

    // texto
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(map(this.hoverLerp, 0, 1, 14, 16));
    text(this.texto, this.w / 2, this.h / 2);

    // reset shadow
    drawingContext.shadowBlur = 0;
    pop();
  }

  mostrar() {
    // fallback no-hover
    push();
    fill(60, 60, 100);
    noStroke();
    rect(this.x, this.y, this.w, this.h, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(this.texto, this.x + this.w / 2, this.y + this.h / 2);
    pop();
  }

  isHover(px, py) {
    return px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h;
  }

  click(px, py) {
    return this.isHover(px, py);
  }
}

// Corazón simple
function heart(x, y, s) {
  push();
  translate(x, y);
  scale(1);
  beginShape();
  vertex(0, 0);
  bezierVertex(-s * 0.5, -s * 0.5, -s, s * 0.33, 0, s);
  bezierVertex(s, s * 0.33, s * 0.5, -s * 0.5, 0, 0);
  endShape(CLOSE);
  pop();
}
