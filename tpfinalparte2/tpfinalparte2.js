//luz Rodríguez Calderón
//Comisión 3 David Bedoian
//Url:


let juego;

function setup() {
  createCanvas(640, 480);
  juego = new Juego();
}

function draw() {
  background(227, 5, 172);
  juego.mostrar();
  juego.actualizar();
}

function mousePressed() {
  juego.click();
}

//////////    ¡¡¡CLAsEs!!!    //////////

//////    JUEGO    //////
class Juego {

  constructor() {
    this.estado = "inicio"; // puede ser inicio, jugando, ganar, perder, creditos
    this.personaje = new Personaje();
    this.miEnemigo = new Enemigo();
    //this.elementos = [];
    this.puntos = 0;
    this.tiempoCreditos = 0;
  }

  mostrar() { //Pantallas
    textAlign(CENTER);
    textSize(20);
    fill(0);

    if (this.estado === "inicio") {
      textSize(35);
      text("Haz click para comenzar", width/2, height/2 - 20);
      text("flechas para moverte", width/2, height/2 + 20); //WASD
      /////Jugando/////
    } else if (this.estado === "jugando") {
      /////mostrar puntaje/////
      textAlign(LEFT);
      textSize(25);
      text("Puntos: " + this.puntos, 10, 30);

      //mostrar personajes y elementos
      this.personaje.dibujar();
      this.miEnemigo.dibujar();
      //for (let e of this.elementos) e.mostrar();

      /////Pantalla  de victoria/////
    } else if (this.estado === "ganar") {
      textSize(35);
      text("Ganaste!", width/2, height/2);
      text("Click para créditos", width/2, height/2 + 40);

      /////Pantalla de derrota/////
    } else if (this.estado === "perder") {
      textSize(35);
      text("Perdiste", width/2, height/2);
      text("Click para créditos", width/2, height/2 + 40);

      /////Pantalla de créditos/////
    } else if (this.estado === "créditos") {
      fill(255);
      textSize(35);
      text("CRÉDITOS", width/2, height/4 - 50);
      text("Puntuación: " + this.puntos, width/2, height/2);
      textSize(20);
      text("Producido por:", width/2, height/1.35); // 70-->(- 20)
      textSize(23);
      text("Luz Rodríguez Calderón (47.953.614) ", width/2, height/1.2); // 110-->(+ 20)
      text("y Valentín San Román Ignacio (45.908.478)", width/2, height/1.1); // 140-->(+ 50)
    }
  }

  actualizar() {
    if (this.estado === "jugando") {
      this.personaje.actualizar();
      this.miEnemigo.actualizar();

      //agregar elementos si se quiere
      //actualizar elementos sketch d
      //colisión con personaje

      // Ejemplo: si el enemigo toca al personaje, pierdes puntos
      let d = dist(this.personaje.x, this.personaje.y, this.miEnemigo.x, this.miEnemigo.y);
      if (d < (this.personaje.tam/2 + this.miEnemigo.tam/2)) {
        this.puntos -= 1;
      }

      //Condiciones de victoria o derrota
      //Resuelve el conflicto (Gana): El jugador derriba a todos
      //los drones de la oleada antes de que alguno impacte la
      //base y antes de que se quede sin munición.
      //No resuelve el conflicto (Pierde):
      //Un número predefinido de drones impacta la base (daño acumulado).
      //El jugador agota toda la munición disponible.

      if (this.puntos >= 100) {
        this.estado = "ganar";
      } else if (this.puntos <= -10) {
        this.estado = "perder";
      }
    }
  }

  click() {
    if (this.estado === "inicio") {
      this.estado = "jugando";
      //this.puntos = 0;
      //this.elementos = [];
    } else if (this.estado === "ganar" || this.estado === "perder") {
      this.estado = "créditos";
    }
  }
}

//////    Personaje    //////
class Personaje {
  constructor() {
    this.x = width/2;
    this.y = height - 50;
    this.tam = 40;
    this.col = color(0, 0, 255);
  }
  dibujar() {
    fill(this.col);
    ellipse(this.x, this.y, this.tam);
  }

  actualizar() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;

    this.x = constrain(this.x, this.tam / 2, width - this.tam / 2);
  }
}


//////    ENEMIGO    //////
class Enemigo {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.tam = 50;
    this.dir = random(0, TWO_PI);
    this.vel = random(2, 4); //(10)
    this.col = color(255, 0, 0);
  }

  actualizar() {
    this.mover();
  }

  mover() {
    //desplazamiento por coordenadas polares:
    this.despX = cos( this.dir ) * this.vel;
    this.despY = sin( this.dir ) * this.vel;
    this.x += this.despX;
    this.y += this.despY;

    //evaluo la contencion en el espacio:
    if ( this.x+this.tam/2 > width  ||  this.x-this.tam/2 < 0 ) {
      this.despX = -this.despX;
    }
    if ( this.y+this.tam/2 > height  || this.y-this.tam/2 < 0) {
      this.despY = -this.despY;
    }

    //restrinjo los valores en x e y:
    this.x = constrain( this.x, this.tam/2, width-this.tam/2);
    this.y = constrain( this.y, this.tam/2, height-this.tam/2);

    //volver a obtener la direccion:
    this.dir = atan2(this.despY, this.despX);

    //modifico sutilmente el angulo de direccion de manera aleatoria:
    this.dir+=random(-0.2, 0.2);
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    rotate( this.dir );
    fill(this.col);
    ellipse(0, 0, this.tam, this.tam);
    fill(0);
    ellipse(this.tam*0.3, 0, this.tam/4, this.tam/4);
    pop();
  }
}
