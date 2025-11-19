//////////////////////////
// BALAS Y DISPAROS
//////////////////////////
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
    ellipse(this.x, this.y, 18); //

    fill(255, 150, 0, 120);
    ellipse(this.x, this.y + 6, 14, 10); //
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
    this.trazo.push( {
    x:
    this.x, y:
      this.y
    }
    );
    if (this.trazo.length > 12) this.trazo.shift();

    this.y -= this.vel;
    this.alpha -= 6;
  }

  mostrar() {
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

//////////////////////////
// PARTICULA
//////////////////////////

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

//////////////////////////
// CONFETTI
//////////////////////////

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


//////////////////////////
// BOTON
//////////////////////////

class Boton {
  constructor(x, y, w, h, texto) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.texto = texto;
    this.hover = false;
  }

  isHover(mx, my) {
    return mx > this.x && mx < this.x + this.w &&
      my > this.y && my < this.y + this.h;
  }

  mostrarHover() {
    this.hover = this.isHover(mouseX, mouseY);

    push();
    rectMode(CORNER);
    noStroke();

    // Fondo con efecto hover
    fill(this.hover ? color(100, 100, 180) : color(60, 60, 100));
    rect(this.x, this.y, this.w, this.h, 10);

    // Borde suave si está en hover
    if (this.hover) {
      stroke(0, 200, 255);
      noFill();
      strokeWeight(2);
      rect(this.x - 2, this.y - 2, this.w + 4, this.h + 4, 12);
    }

    // Texto
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(this.hover ? 17 : 15);
    text(this.texto, this.x + this.w / 2, this.y + this.h / 2);

    pop();
  }

  click(mx, my) {
    return this.isHover(mx, my);
  }
}
