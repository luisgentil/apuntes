# Apuntes 
## Lo que voy aprendiendo sobre Html, CSS y Javascript
En cada apartado, señalo primero lo que FUNCIONA, y después lo que NO funciona.

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


## Extraer texto de otra web

NO funciona: bueno, sólo funciona para páginas en el mismo directorio, así que para versiones locales.  
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

