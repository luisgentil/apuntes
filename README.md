# Apuntes sobre lo que voy aprendiendo sobre Html, CSS y Javascript
En cada apartado, señalo primero lo que FUNCIONA, y después lo que NO funciona.
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

