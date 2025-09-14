function modulo (x_, y_, w_, h_, indiceA_, indiceB_) {
  push () ;
//cuadrados
if( (indiceA_ + indiceB_)%2==0){
  fill (c1);
 } else {
   fill (c2);
 } 
 rect(x_, y_, w_, h_);
 
  //circulos
  noStroke ();
 if( (indiceA_ + indiceB_)%2==0){
  fill (c2);
 } else {
  fill (c1); //azul
 }
 ellipse(x_+67, y_+67, w_-2, h_-2);
 
 pop () ;
}
