# Apuntes de tracking.js

Puedes descargar el proyecto desde su web, pero no es necesario para usar la librería. Sólo añadiendo el archivo tracking.js o tracking-min.js es suficiente para usar la librería.  

El proyecto completo tiene otras ventajas, a saber: herramientas de conversión, etc.  

### cómo modificar el tamaño por el que se reconoce un objeto en Tracking.js
Hay que usar setMinDimension(pixels) y setMinGroupSize(pixels), que son parámetros del tracker.  
Hay que modificarlo después de crear la instancia del tracker que queremos seguir, por ejemplo:  
```javascript
var colors = new tracking.ColorTracker(['blue']); // vamos a seguir un color azul
  colors.setMinDimension(1);                      // número mínimo de pixels del color
  colors.setMinGroupSize(1);                      // número mínimo de pixles conectados del mismo color
  
  colors.on('track', function(event) {            // continúa el código...  
```

