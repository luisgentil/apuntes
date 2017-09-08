# Apuntes 
## Lo que voy aprendiendo sobre Html, CSS y Javascript
En cada apartado, señalo primero lo que FUNCIONA, y después lo que NO funciona.

## Analizar el código en la consola
FUNCIONA  
console.log(lo que quieras ver en la consola)  


## JSON, lo básico
JSON es una forma de compartir datos entre el cliente y el servidor.  
JSON es texto, string, pero escrito en la notación JavaScript. Así, es fácil convertirlo en **_objetos_** Javascript.  
(recordatorio: un objeto es un conjunto de propiedades, y éstas son pares nombre:valor, que pueden incluir métodos, que son funciones, es decir un par función():definición de función).  
(No confundir con los Arrays, que son objetos especiales en JS: objetos (por tanto, con pares nombre:valor), cuyos nombres (índices) son números, de ahí la especialidad. Se definen con **[]**)  
La respuesta que se recibe de un servidor es json, es decir: texto. Para trabajar con ella en JS hay que convertirla en objeto JS, mediante json.parse() --> se conoce como **parsear** la respuesta.  
En cambio, cuando se quiere enviar información al servidor, sólo se puede enviar como texto. Normalmente tenemos la información como un objeto JS, por lo que tenemos que convertirlo a texto con el método stringify(miObjeto).  
La sitaxis JSON es muy sencilla:  
	* los datos se forman con pares nombre:valor,  
	* los pares de datos se separan con comas,  
	* puede contener objetos, en un par nombre:llaves {},  
	* idem con Arrays, par nombre:corchete [].  
	* los nombres deben ir entre comillas dobles " ",  
	* los valores string también van entre comillas dobles " ",  

Al igual que en JS, podemos acceder a los valores mediante la notación punto (json.name), o la notación de corchetes (json["name"]).  
'You can request JSON from the server by using an AJAX request'  --> esto será la siguiente etapa, ver https://www.w3schools.com/js/js_json_parse.asp#JSON_From_the_Server  


## Extraer texto de otra web

**Funciona en API MediaWiki**  
Para saltar el CORS, hay que saltar la restricción del origen, permitiendo cualquier origen, añadiendo &origin=* en la consulta.  
>Unauthenticated CORS requests may be made from any origin by setting the "origin" request parameter to (asterisc). In this case MediaWiki will include the Access-Control-Allow-Credentials: false header in the response and will process the request as if logged out (in case credentials are somehow sent anyway).  

From: [https://www.mediawiki.org/wiki/API:Cross-site_requests]  
En el ejemplo siguiente, https://es.wikipedia.org/w/api.php?action=query&titles=Montehermoso&prop=revisions&rvprop=content&format=json&origin=* sí puede ser cargado en un div a partir de la respuesta a esa consulta.

**¿Funciona?**  
Según lo leído en https://www.w3schools.com/js/js_json_jsonp.asp, con JSONP se puede superar el problema de los orígenes cruzados ('distintos directorios'), hay que ampliarlo.   
(*'JSONP is a method for sending JSON data without worrying about cross-domain issues. JSONP does not use the XMLHttpRequest object. JSONP uses the "script" tag instead.')*  
Habría que comprobar las referencias, y buscar la explicación a la función callback de la que se habla en algunas de ellas.  


**NO funciona**  
Bueno, sólo funciona para páginas en el mismo directorio, así que para versiones locales.  
```[javascript]  
<div id="caja" onclick="myFunction()">Aquí mostrará el contenido </div>  
<iframe id="iframePagina1" src="martillo.htm"></iframe>  
<iframe id="iframePagina2" src="https://es.wikipedia.org/wiki/Martillo"></iframe>  
<script>  
function myFunction() {  
	var iframeDocument = document.getElementById('iframePagina1').contentDocument;  
	var myDiv = iframeDocument.getElementById('firstHeading');  
    document.getElementById("caja").innerHTML = myDiv.innerHTML;}  
</script>
```

En el ejemplo anterior, al hacer click en el texto "Aquí mostrará el contenido", mostrará "Martillo" si es la versión descargada, la de iframePagina1, pero no si iframePagina2 es desde wikipedia.  


## Mostrar imágenes de otra web  
FUNCIONA  
Especificar el atributo src: <img id="scream" width="300" height="400" src="http://www.meteoclimatic.net/addons/graf24hh.php?st=ESAND4100000041960A">  

## Mostrar parte de una imagen  
NO FUNCIONA  
No funciona si se intenta "a lo bruto", como por ejemplo:  <img id="jaja" width="200" height="120" src="http://www.meteoclimatic.net/addons/graf24hh.php?st=ESAND4100000041960A">  
El resultado es que la imagen es muy pequeña, se adapta el tamaño al tamaño del marco.  

FUNCIONA  
Se usa el elemento <canvas>, elemento HTML que permite dibujar en él. Se "dibuja" la imagen que nos interesa con Javascript, especificando el punto (superior izquierdo) donde comienza la imagen que queremos mostrar.  
```function() {
  	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var img = document.getElementById("scream");
	ctx.drawImage(img, -520,-145);  
  
<canvas id="myCanvas" width="200" height="120" style="border:1px solid #000000"; onload='myFunction()'></canvas>
```  




   
	

