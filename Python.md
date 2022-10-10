# Apuntes sobre Python
#### Indice
*(Incluye también notas sobre módulos, hasta que sean tan grandes que se hagan independientes)*.  

- [PIP](#pip)
- [Numpy](#numpy)  
- [Scipy](#scipy)  
- [Matplotlib](#matplotlib)  
    - [Crear una recta de regresión](#crear-una-recta-de-regresión)  
    - [Cómo pintar 3 puntos y las líneas que los unen](#cómo-pintar-3-puntos-y-las-líneas-que-los-unen)  
- [OpenCV](#opencv)  
- [PIL](#pil)    
- [Otros:](#otros)  
    - [Descargar un fichero de internet](#descargar-un-fichero-de-internet)  
    - [Formatear números decimales](#formatear-números-decimales)  
    - [Formatear cadenas](#formatear-cadenas)


### PIP
Cómo usar un módulo SIN usar pip: [fuente]https://es.stackoverflow.com/questions/313737/como-instalar-modulos-en-python-sin-usar-pip
Suele funcionar: descargar el módulo desde pypi, descomprimir en la carpeta lib correspondiente a la instalación de Python (portable, si aplica), y suele funcionar.


### Numpy 
Una rápida [introducción en la web de Scipy](https://docs.scipy.org/doc/numpy-1.15.0/user/quickstart.html).  
Arrays: entre []. Un punto en el espacio: [1,2,4].
Se crean con la clase `ndarray`.  

Dimensiones: llamadas 'ejes'. primer eje con 2 elementos, 2º eje con tres elementos: 
```
[[ 1., 0., 0.],
 [ 0., 1., 2.]]
 ```
 Atributos importantes: ndarray.ndim, ndarray.shape, ndarray.size, **ndarray.dtype**.  
 Funciones / utilidades: np.arange, np.zeros, np.ones, .reshape, funciones universales (ufunc) que se aplican a todo el array a la vez, np.average(data).  
 
 
### Scipy
_SciPy contains additional routines needed in scientific work: for example, routines for computing integrals numerically, solving differential equations, optimization, and sparse matrices._

### Matplotlib
Una librería para representar datos en gráficos. Básico leer la [documentación introductoria](https://matplotlib.org/tutorials/introductory/usage.html#sphx-glr-tutorials-introductory-usage-py).  
Los datos están contenidos en un np.array.  
plt.plot: comando versátil para representar datos.  
Típico: plot (conjunto de X), (conjunto de Y), (color-tipo)
Se pueden acumular varias líneas, o grupos de puntos, añadiendo conjuntos de 3 elementos.  
plt.plot(t, t, 'r--', t, t**2, 'bs', t, t**3, 'g^')  

#### Crear una recta de regresión
Un ejemplo sencillo para una recta de regresión **con Scipy**. Hacen falta dos conjuntos de datos, y la función de scipy.  
```python
from scipy import stats
import cv2
import matplotlib.pyplot as plt
x = [1,2,2.8,4]
y = [1,2,2.9,4]
slope, intercept, r_value, p_value, std_err = stats.linregress(x,y)
print "r-squared:", r_value**2
plt.plot(x, y, 'o')
plt.show()
```
Para crear la recta con **Numpy**:  más complejo.  
```python
    xx = np.array(x)
    yy = np.array(y)
    A = np.vstack([yy, np.ones(len(yy))]).T
    pendiente, ord_origen = np.linalg.lstsq(A, xx)[0]
```

#### Cómo pintar 3 puntos y las líneas que los unen
```python
center_0 = np.array([100, -100])
center_1 = np.array([253,-238])
center_2 = np.array([300, -300])

center = np.vstack((center_0, center_1, center_2))

gg = np.hsplit(center,2)

## plt.plot (serie de Xs, serie de Ys)
plt.plot(gg[0],gg[1], "o")
plt.plot(gg[0],gg[1])
plt.legend()
plt.show()
```

### OpenCV
Básicamente, hay que tener en cuenta lo que ya resumí en [Apuntes sobre OpenCV](https://github.com/luisgentil/apuntes/blob/master/OpenCV.md)  
No es posible leer directamente GIF con CV2, (ver [este enlace](http://answers.opencv.org/question/185929/how-to-read-gif-in-python/ )). Hay que convertirlo en png previamente. Por eso acudí a PIL.   
En Open CV, el orden es distinto al de otros módulos: cv2.shape = rows, columns = **Y, X**.  

### PIL
#### Abrir un GIF y grabarlo como png
PIL, Python Imaging Library, puede trabajar con casi todos los formatos de imagen, incluyendo todos los que yo conozco. A continuación, un código para abrir un formato (gif) y grabarlo como otro formato (png).  
```python
def pasa_PNG(imagenGIF):
    '''función para convertir una imagen GIF en png'''
    
    from PIL import Image, ImageFilter
    ## extrae ruta de imagen + nombre
    ruta = imagenGIF[:-3]
    ## extraer extensión
    extension = imagenGIF[-3:]
    ## preparar nombre
    imagenPNG = ruta + "png"
    #--print imagenPNG
    if extension.lower() == "gif":
        try:
            original = Image.open(imagenGIF)
            #--print "ok"
            original.save(imagenPNG)
            #--print imagenPNG
            return imagenPNG
        except:
            print "Unable to load image"
            return "error"
```
#### Sobre los formatos de imagen
Recojo aquí información útil, porque siempre me planteo la duda:
> **PNG**: utilizar en gráficos, ilustraciones, y archivos pequeños en la web que necesiten transparencias. Evitar en fotografías con muchos detalles que necesiten ser subidas a la web porque serán demasiado pesadas.  
>JPG: ideal para mostrar fotografías en la web sin ocupar mucho espacio en un servidor. **Terrible para edición de imágenes**.  
> (encontrado en [este enlace](https://blogthinkbig.com/diferencia-entre-png-jpg-y-gif))  
Así que usaré formato PNG.  

### Otros
#### Descargar un fichero de internet
##### Python 3
Con el siguiente código se descarga una página de intgernet, vía url en Python 3 (Colab ya no admite 2.7).
```python
def averiguar(url):
  """Descarga el texto de una url"""
  # Hace una descarga de la url
  resource = urllib.request.urlopen(url) 
  html_response = resource.read()
  encoding = resource.headers.get_content_charset('utf-8')
  decoded_html = html_response.decode(encoding)
  return dedoded_html
```
##### Python 2.7
Con el siguiente código se puede descargar un recurso de internet, vía url (Python 2.7).  
Uso el módulo urllib2 porque facilita la transición a Python 3.  
```python
import urllib2
ultimo_file = 'http://www.aemet.es/imagenes_d/eltiempo/observacion/radar/201901111120_r8se.gif'
nombre = ultimo_file.rsplit('/')[-1]
resource = urllib2.urlopen(ultimo_file)
#ruta = os.getcwd() + "\\images\\" + nombre                         # en disco físico
ruta = '/content/gdrive/My Drive/Colab Notebooks/images/' + nombre  # en Google Drive
print ruta
output = open(ruta,"wb")
output.write(resource.read())
output.close()
# para comprobar si lo ha grabado, descomentar lo siguiente
#import os
#print os.path.isfile(ruta)
```
#### Formatear números decimales
```python
'y= ' + "{0:.2f}".format(0.2589754) +' * x + ' + "{0:.2f}".format(5569.32547)
```
`'y= 0.26 * x + 5569.33'`
 

#### Formatear cadenas
Para imprimir cadenas siguiendo un patrón, lo más útil es usar format. Ejemplo:
```python
print ('{0:=^22s} {1:=^16s} {2: ^6s} {3:=^22s} {4:=^16s}'.format("Fecha anterior","Anuncios",'==',"_Ahora_","_Nuevos_"))
```
Imprimirá lo siguiente: 

```====Fecha anterior==== ====Anuncios====   ==   =======_Ahora_======== ====_Nuevos_==== ```

Explicación {0:=^22s} :
+ '0' es el nº de orden, se corresponderá con el primer elemento que se va a formatear, en este caso, "Fecha anterior".
+  '=' es el carácter que se usará de relleno, si es necesario, para alcanzar el nº de caracteres asignado.
+  '^': cómo se organiza el texto, en este caso es centrado. Para izquierda o derecha, '<' o '>'.
+  22: el nº de caracteres que se asigna a esa cadena, si no se alcanza se usará el carácter de relleno.
+  s/d/f: string, nº entero, floating point number.

Toda la información en: https://pyformat.info/.
_____
___________________ **[volver al índice de 'apuntes'](https://github.com/luisgentil/apuntes/blob/master/README.md)** _______________ **[volver arriba](#indice)** ______________________________
_____
