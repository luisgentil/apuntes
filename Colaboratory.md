# Colaboratory 'Colab' de Google

#### Indice


### Conectar con almacenamiento en Drive
Para usar el almacenamiento en Drive, para grabar datos entre distintas ejecuciones del código, lo primero es conectar con el Drive de la cuenta de Google desde la que se ejecuta el cuaderno Colab.

```python
#@title 1. EJECUTAR: pieza previa Código completo 
#@markdown El código necesita tener acceso a la carpeta donde guardar los archivos, así que debes autorizar. Pulsa el triángulo que hay a la izquierda de esta celda.

#@markdown Tendrás que seguir el vínculo, pulsar tu cuenta, pulsar 'Permitir', y copiar un código que aparece en la pantalla. Después, vuelve y pégalo en la ventana que apareció debajo, y pulsa la tecla 'Intro' en tu PC.

# antes de ejecutar el código siguiente, hay que ejecutar esta celda 
# y seguir las indicaciones:
from google.colab import drive
print('Conectando con Drive.\n Un momento, por favor....')
drive.mount('/content/gdrive')
```








_____
___________________ **[volver al índice de 'apuntes'](https://github.com/luisgentil/apuntes/blob/master/README.md)** _______________ **[volver arriba](#indice)** ______________________________
_____
