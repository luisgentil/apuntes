# HTML, CSS, Javascript

Mis apuntes de HTML, CSS, Javascript.  


## Índice
- [Tips de sintaxis MD para escribir archivos README.md](#tips-de-sintaxis-md-para-escribir-archivos-readmemd)  
- [Llamada a una función, con parámetros](#llamada-a-una-función-con-parámetros)  
- [Analizar el código en la consola](#analizar-el-código-en-la-consola)  
- [JSON, lo básico](#json-lo-básico)  
- [FireBase, lo básico](#firebase-lo-básico)
- [Extraer texto de otra web](#extraer-texto-de-otra-web)  
- [Mostrar imágenes de otra web](#mostrar-imágenes-de-otra-web)  
- [Mostrar parte de una imagen](#mostrar-parte-de-una-imagen)   
- [Añadir plugin en PhoneGap](#añadir-plugin-en-phonegap)  
- [CSS básico](#css-básico)
- [Hammer.js, detección de eventos](#hammerjs)
- [Herramienta 'apktool' para ver el android.manifest](#herramienta-apktool-para-ver-el-androidmanifest)
- [Convertir saltos de línea, retornos de carro, \n](#convertir-saltos-de-línea)  
- [Local Storage](#local-storage)  
- [Cómo ocultar o mostrar un menú](#cómo-ocultar-o-mostrar-un-menú)  
- [Mostrar un icono](#mostrar-un-icono)  
- [Cómo usar una fuente de Google](#cómo-usar-una-fuente-de-google)  
- [Cómo insertar botones de compartir en Redes Sociales](#cómo-insertar-botones-de-compartir-en-Redes-Sociales)  
_____
___________________ **[volver al índice de 'apuntes'](https://github.com/luisgentil/apuntes/blob/master/README.md)** ______________________________________________
_____

## Llamada a una función, con parámetros  
FUNCIONA  
A veces hay que hacer una llamada a una función, por ejemplo:  
`var myPause = setInterval(funciónCadaIntervalo, milisegundos);`  

Con esa sintaxis no se puede enviar un parámetro con la llamada a la fucniónCadaIntervalo.   
La solución: especificar la sintaxis mediante la expresión funtion(), y entre llaves hacer la llamada a la función con sus parámetros.  
`var myPause = setInterval(function() {funciónCadaIntervalo(parámetro, otroParámetro)}, milisegundos);`  

## Tips de sintaxis 'MD' para escribir archivos README.md  
https://github.com/jfasebook/SoyInformatico/blob/master/README.md  

No obstante, el tema de los anchors no siempre me funciona como dice ese documento (o al menos, no en Jupyter Notebook). En esos casos, sí funciona cuando el título sólo contiene minúsculas y caracteres ASCII.  

## Analizar el código en la consola
FUNCIONA  
`console.log(lo que quieras ver en la consola)`  

## JSON, lo básico
JSON es una forma de compartir datos entre el cliente y el servidor.  
JSON es texto, string, pero escrito en la notación JavaScript. Así, es fácil convertirlo en **_objetos_** Javascript.  
(recordatorio: un objeto es un conjunto de propiedades, y éstas son pares nombre:valor, que pueden incluir métodos, que son funciones, es decir un par función():definición de función).  
(No confundir con los Arrays, que son objetos especiales en JS: objetos (por tanto, con pares nombre:valor), cuyos nombres (índices) son números, de ahí la especialidad. Se definen con **[]**)  
La respuesta que se recibe de un servidor es json, es decir: texto. Para trabajar con ella en JS hay que convertirla en objeto JS, mediante `json.parse()` --> se conoce como **parsear** la respuesta.  
En cambio, cuando se quiere enviar información al servidor, sólo se puede enviar como texto. Normalmente tenemos la información como un objeto JS, por lo que tenemos que convertirlo a texto con el método `stringify(miObjeto)`.  
La sitaxis JSON es muy sencilla:  
	* los datos se forman con pares nombre:valor,  
	* los pares de datos se separan con comas,  
	* puede contener objetos, en un par nombre:llaves {},  
	* idem con Arrays, par nombre:corchete [].  
	* los nombres deben ir entre comillas dobles " ",  
	* los valores string también van entre comillas dobles " ",  

Al igual que en JS, podemos acceder a los valores mediante la notación punto `(json.name)`, o la notación de corchetes `(json["name"])`.  

Para recorrer las claves del Json, recorriendo todas las claves del objeto, con un loop for "In a for-in loop, use the bracket notation to access the property values:" https://www.w3schools.com/js/js_json_objects.asp  
`for (numero in respuesta.query.pages) {(···)}`

**Conversión de datos en JSON**
En la web "Mr Data Converter", https://shancarter.github.io/mr-data-converter/ , se puede acceder a un conversor online de datos CSV --> JSON. Muy útil para convertir una tabla de datos excel en json, lo que puede servir para recopilar información de municipios.  
En la web http://jsoneditoronline.org/ se puede visualizar fácilmente el contenido de un copy-paste en formato JSON, como por ejemplo las respuestas de Wikipedia.  

'You can request JSON from the server by using an AJAX request'  --> esto será la siguiente etapa, ver https://www.w3schools.com/js/js_json_parse.asp#JSON_From_the_Server  


## FireBase, lo básico
Firebase es muchas cosas, pero yo me quedo con **_"una base de datos online"_**.  
(información Firebase-AppInventor 2 en [App_Inventor_2.md](https://github.com/luisgentil/apuntes/blob/master/App_Inventor_2.md)).  
Hay mucha información y ejemplos acerca de cómo grabar datos, y poco sobre cómo leerlos (en mi ignorancia). La fuente de información más práctica que he encontrado: `https://desarrolloweb.com/articulos/introduccion-firebase-backend-nube.html`.  
Por lo que he entendido: no hay que leer, sino **suscribirse** a los cambios del valor. Es decir, podemos tener actualizados los datos mediante la conexión que hace (y mantiene) Firebase. Así que para leer, con el valor inicial es suficiente.  
El código de búsqueda / lectura:  
en el html: `<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase.js"></script>`  
Y el script, algo así:  
```javascript
<script>
  // Initialize Firebase
  var config = {
    apiKey: "**************",
    authDomain: "*******.firebaseapp.com",
    databaseURL: "https://*******.firebaseio.com",
    projectId: "infotown-****",
    storageBucket: "infotown-****.appspot.com",
    messagingSenderId: "*********"
  };
  firebase.initializeApp(config);
  var databaseService = firebase.database();

    function buscarFirebase(pueblo) {
            var ref = databaseService.ref('municipios');
            ref.child(pueblo.toLowerCase()).on("value", function(snapshot){
              resultado = (snapshot.val() || "");
      document.getElementById("titular").textContent = resultado;
        });
    }
  </script>
```
Para grabar, set o update: set sustituye, update actualiza.  
En FireBase hay otro concepto interesante, el de las **'promesas'**. Simplificando: se hace el intento de grabar, y se ofrecen dos opciones, una por si hay éxito y otra si hay error. Así, en la consola (y en pantalla) se obtiene feedback del proceso.  
Un ejemplo de función de grabación, con uso de promises:  
```javascript
<script>
        function grabarListadoFirebase() {
            var referencia = databaseService.ref('municipios');
    // escribo en esa referencia
   referencia.update(lista);
        // realizo uso de las promesas
    console.log(lista);
    referencia.update(lista)
            .then(function() {
                console.log('lista almacenada correctamente');
                document.getElementById("resultado").textContent = "correcto";
            })
            .catch(function(error) {
                console.log('detectado un error', error);
            });
    }
</script>
```

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
```javascript  
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
Especificar el atributo src:  <img id="scream" width="300" height="400" src="http://www.meteoclimatic.net/addons/graf24hh.php?st=ESAND4100000041960A">  `<img id="scream" width="300" height="400" src="http://www.meteoclimatic.net/addons/graf24hh.php?st=ESAND4100000041960A">`  

## Mostrar parte de una imagen  
NO FUNCIONA  
No funciona si se intenta "a lo bruto", como por ejemplo: <img id="jaja" width="200" height="120" src="http://www.meteoclimatic.net/addons/graf24hh.php?st=ESAND4100000041960A">   `<img id="jaja" width="200" height="120" src="http://www.meteoclimatic.net/addons/graf24hh.php?st=ESAND4100000041960A">`  
El resultado es que la imagen es muy pequeña, se adapta el tamaño al tamaño del marco.  

**FUNCIONA**  
Se usa el elemento <canvas>, elemento HTML que permite dibujar en él. Se "dibuja" la imagen que nos interesa con Javascript, especificando el punto (superior izquierdo) donde comienza la imagen que queremos mostrar.  
```javascrpit  
   function() {  
  	var c = document.getElementById("myCanvas");  
	var ctx = c.getContext("2d");  
	var img = document.getElementById("scream");  
	ctx.drawImage(img, -520,-145);  
<canvas id="myCanvas" width="200" height="120" style="border:1px solid #000000"; onload='myFunction()'></canvas>   
```  

## Añadir plugin en PhoneGap
No todos los módulos están disponibles en Phonegap Desktop, básicamente están disponibles los típicos: cámara, mensajes, etc. Los que no están en ese listado típico (ver [link-pendiente]) hay que añadirlos aparte.  
Hay dos formas, que yo sepa, de hacer esto:  
- subir los archivos y tal, cosa que no sé hacer porque no uso CLI;  
- referenciar al repositorio npm: hay que insertar el plugin en el xml, con su nombre correcto.  
De esta forma, sin tener los ficheros del plugin, puedes usar su funcionalidad.
Cuando funciona es una pasada.
En este mismo repositorio de Github he creado un ejemplo llamado "Chat example". Se trata de uno de los ejemplos de Don. He seguido las indicaciones (me costó), y ayer funcionó. Lo que hice:  
- fork del repositorio completo  
- copié el ejemplo en una nueva carpeta (un nuevo proyecto de git)  
- creé una nueva app en Phonegap Build, con referencia al GitHub de la nueva carpeta,  
- modifiqué el xml, y añadí la referencia al plugin (me costó encontrar el nombre correcto)  
- empaqueté la app, 
- con el Bluetooth activo, y habiendo emparejado con el Arduino, abrí la app,  
- aparece la lista de dispositivos emparejados, y consiguió conectar con el Arduino Zum 328.  
En el arduino tenía cargado un script sencillo, preparado desde DIWO (BQ). Muy simple, un contador que devuelve un número cada vez que recibe cualquier cosa por el puerto serie.  
Traté de hacer funcionar la app con otro Android y, efectivamente, no funciona.  

## CSS básico
A ver si resumo un poco lo que he estudiado en estos días en http://progate.com/html/study/1/1  
Básico: usar una buena plantilla, he creado una llamada "6 cuadros", adaptada a lo que me gusta.  
También las hay en CSS W3School, https://www.w3schools.com/css/css_templates.asp  
Básico-básico: usar clases, SIEMPRE. Una clase por cada elemento que se quiera diferenciar.  
Display block, float left.  

### Transparencia: opacity y rgba
rgba is used when you want to specify the transparency of the color. You specify four values for rgba, and the fourth value specifies the transparency from 0.0 to 1.0, 0.0 being the most transparent.  
Con opacity, todo el elemento se hace transparente (texto también).  
--pendiente--

## Hammer.js
Una librería para detectar eventos, tanto en PC como en pantallas táctiles, muy práctico.  
En html: 
```
<script src="https://hammerjs.github.io/dist/hammer.js"></script>
```  
En js:
```
var myElement = document.getElementById('myElement');
// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);
// listen to events...
mc.on("panleft panright tap press", function(ev) {otraFunction(ev);}); 
```  
Por defecto, escucha los eventos pan, tap, press.  
Hay que definir la función de éxito, y funciones para cada dirección.  

## Herramienta 'apktool' para ver el android.manifest  
Ver en los apuntes de Phonegap, [#herramienta apktool](https://github.com/luisgentil/apuntes/blob/master/Phonegap.md#herramienta-apktool).  

## Convertir saltos de línea
#### Convertir saltos de línea, retornos de carro, \n
Por lo visto, en Windows los saltos de línea se representan por los códigos CRLF (retorno de carro + final de línea); en otros sistemas el salto de línea es más sencillo, \n por ejemplo.  
CR = \r , LF = \n.  
\n <> \\n, ojo con esto a la hora de sustituir.  
Cómo he aplicado esto: quería convertir un texto con varios saltos de línea, en un texto con los cambios de línea condificados, pero todo el texto en una sola línea (para la app de coros). Al final, pude hacerlo en Notepad++, reemplazando: \r\n (=CRLF, salto en windows) por \\n (que será el salto en html).  

## Local Storage  
#### Local Storage: alternativa viable a las variables globales
He tenido problemas usando variables "globales", que no actúan como tales. Así que uso Local Storage, que sí persiste entre distintas funciones.  
La pega, que no permite estructura anidada.  
```
Almacenar: localStorage.[variable] = [valor]  
Recuperar: document.getElementById("result").innerHTML = localStorage.[variable]  
```  
sessionStorage. es lo mismo, pero sólo persiste en esa sesión.  


## Cómo ocultar o mostrar un menú  
Para aprovechar toda la superficie de pantalla, podemos hacer que el menú se oculte y sólo se muestre al pulsar un botón. Al pulsar de nuevo, se oculta. Esto se logra mediante la opción toggle:  
```
function Ocultar() {
	document.getElementById('caja-menu').classList.toggle('fuera');}

En CSS: 
	.fuera {display: none;}
```
Esto se combina con la posición (absolute, relative) de la caja de botones. Esta caja debe tener posición relativa al div sobre el que se sitúa (y lo contiene).  

Supongo que, para ocultar cuando se elige uno de los botones incluidos en la botonera, hay que añadir una llamada a Ocultar() para que oculte la botonera. FALSO: al llamar, hace toggle; pero lo hace cuando se llama la función cargar, que se llama desde otras partes de la aplicación.  

## Mostrar un icono  
Hay que importar una librería de iconos, mediante una línea en el <head>. Después, hay que usar el método de esa librería para insertar el icono, normalmente mediante una etiqueta <i> o <span>. Admiten estilos vía CSS.  

```
Font Awesome icons: 	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  
			<i class="fa fa-bars"></i>  
			<i class="fa fa-bars" style="font-size:60px;color:lightblue;text-shadow:2px 2px 4px #000000;"></i>  

Google icons:		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">  
			<i class="material-icons">attachment</i>  
			<i class="material-icons" style="font-size:60px;color:lightblue;text-shadow:2px 2px 4px #000000;">cloud</i>  
```
Las fuentes de google especifican el nombre dentro del <i>, con un nombre.  

Para 'amontonar' iconos (por ejemplo, para fotos-prohibición), en Awasome Icons hay que usar una clase especial, fa-stack, para el agrupamiento, la clase fa-stack-1x para el icono de tamaño normal, y stack-2x para el icono mayor. Con fa-inverse se puede alternar el color.   
Más detalles en https://www.w3schools.com/icons/fontawesome_icons_intro.asp .  
```
	<button class="otroddd otro" id="botonAcordes" onclick="Ban()">
		<span class="fa-stack">
			<i class="fa fa-hashtag fa-stack-1x"></i>
			<i id="ocultar" class="fa fa-ban fa-stack-2x rojo"></i>
		</span>
	</button>  
```

## Cómo usar una fuente de Google  
Para especificar una fuente de google, en el head del html hay que insertar:  
<link href='https://fonts.googleapis.com/css?family=Acme' rel='stylesheet'>  
Después, en el CSS, especificar la fuente:  
	font-family: 'Acme';  
	

## Cómo insertar botones de compartir en Redes Sociales  
La forma más sencilla de insertar botones (que funcionen) para compartir contenido en redes sociales es usar el servicio web de **https://sharingbuttons.io/** .  
Sólo hay que especificar tres parámetros, copiar el html y el css, y ya funciona.  
	

_____
___________________ **[volver al índice de 'apuntes'](https://github.com/luisgentil/apuntes/blob/master/README.md)** _______________ **[volver arriba](#html-css-javascript)** ______________________________
_____
