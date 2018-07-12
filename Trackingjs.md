# Apuntes de tracking.js

## Indice
 - [Cómo modificar el tamaño por el que se reconoce un objeto en Tracking.js](#cómo-modificar-el-tamaño-por-el-que-se-reconoce-un-objeto-en-Trackingjs)  
 - [Adaptar una haar cascade a tracking.js](#adaptar-haar-cascade-a-tracking)  
 - [](#)  
 - [](#)  
 - [](#)  
 - [](#)  

Puedes descargar el proyecto desde su web, pero no es necesario para usar la librería. Sólo añadiendo el archivo tracking.js o tracking-min.js es suficiente para usar la librería.  

El proyecto completo tiene otras ventajas, a saber: herramientas de conversión, etc.  

### Cómo modificar el tamaño por el que se reconoce un objeto en Tracking.js
Hay que usar setMinDimension(pixels) y setMinGroupSize(pixels), que son parámetros del tracker.  
Hay que modificarlo después de crear la instancia del tracker que queremos seguir, por ejemplo:  
```javascript
var colors = new tracking.ColorTracker(['blue']); // vamos a seguir un color azul
  colors.setMinDimension(1);                      // número mínimo de pixels del color
  colors.setMinGroupSize(1);                      // número mínimo de pixles conectados del mismo color
  
  colors.on('track', function(event) {            // continúa el código...  
```

### Adaptar una haar cascade a tracking.js  
**Información previa y referencias** en la sección 'Issues' del proyecto Tracking.js en Github:  
"__gulp-converter-tjs__" _Converts new and old type of OpenCV HaarCascade XML data to tracking.js' internal format._  
https://github.com/cirocosta/gulp-converter-tjs  (from #197)  Otras relacionadas: #120

[actualización 15/06/2018]:  Run your program, una guía básica para el proceso de conversión xml -> js:  
https://github.com/cirocosta/gulp-converter-tjs/issues/10  

Descarga "oficial" de la herramienta: https://www.npmjs.com/package/gulp-converter-tjs  

Otra aplicación para transformar xml a js:  _[ACTUALIZADO]_: Esta es la que termino usando  https://github.com/wildhaber/haar2tjs  "convert Haar classifier to tracking.js classifiers for object tracking. "  

Cuando queremos crear un detector específico que funcione en Tracking.js, hay que convertir la haar-cascade.xml al formato que usa la librería Tracking, que formalmente es un fichero de extensión 'js'. Para la conversión hay al menos dos herramientas, gulp-converter-tjs y **hhar2tjs** (es la que empleé).  

Seguir las instrucciones de Wildhaber, 'haar2tjs'. En resumen, hay que:  
instalar node.js y npm.  
a través de una consola, login en node.  
sigo las instrucciones para instalar el módulo haar2tjs.  
descargo / copio los archivos de ejemplo: el xml, el script example_script.js  
Cómo ejecutar el módulo, es muy sencillo: sólo 'node example_script.js' en la consola.  
crea el resultado como anunciaba la web del módulo con el ejemplo.  
descargo mi cascade, cascade-900-1400-19.xml, modifico example_script, ejecuto y ¡voilá! creado el fichero cascade-700-1400-19.js  
Asegurar que el fichero nombra lo que tú quieres:  lo que debe nombrar es el objeto custom, con el nombre que tú quieres darle. Así que renombro a tracking.ViolaJones.classifiers.__cascade__.  
Después, en el código, hay que decirle que detecte tu objeto, con ese nombre:  
```(45) var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth', **'cascade'**]);```



_____
___________________ **[volver al índice de 'apuntes'](https://github.com/luisgentil/apuntes/blob/master/README.md)** _______________ **[volver arriba](#apuntes-de-trackingjs)** ______________________________
_____
