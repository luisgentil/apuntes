

window.onload = function() {

cargar =function (){
  document.getElementById('original').innerText = "re          FA             DO  re \nHoy empieza una nueva era,\n     FA            DO   re    \n las lanzas se convierten en podaderas,\n           FA         DO     re \n de las armas nacen arados\n               FA            DO  re\n y los oprimidos son liberados.";

  //
};

transformar = function(){
    var text = document.getElementById('original').p;
    document.getElementById('procesado').innerText = text;
  };
}
