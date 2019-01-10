# Apuntes sobre Python
#### Indice
*(Incluye también notas sobre módulos, hasta que sean tan grandes que se hagan independientes)*.  

- [Numpy](#numpy)  
- [Scipy](#scipy)  
- [Matplotlib](#matplotlib)  
    - [Crear una recta de regresión](#crear-una-recta-de-regresión)  
- [OpenCV](#opencv)  
- [PIL](#pil)    
- [Otros:](#otros)  
    - [Descargar un fichero de internet](#descargar-un-fichero-de-internet)  
    - [Formatear números decimales](#formatear-números-decimales)  
    - [Cómo pintar 3 puntos y las líneas que los unen](#cómo-pintar-3-puntos-y-las-líneas-que-los-unen)  

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
```python
## PRUEBAS PARA descargar imágenes de forma automática
import urllib.request
print('Beginning file download with urllib2...')

ultimo_file = 'C:\images\201812031210_r8se.gif'
url = 'http://www.aemet.es/imagenes_d/eltiempo/observacion/radar/201812031210_r8se.gif'  
urllib.request.urlretrieve(url, ultimo_file) 
```
#### Formatear números decimales
```python
'y= ' + "{0:.2f}".format(0.2589754) +' * x + ' + "{0:.2f}".format(5569.32547)
```
`'y= 0.26 * x + 5569.33'`
 

_____
___________________ **[volver al índice de 'apuntes'](https://github.com/luisgentil/apuntes/blob/master/README.md)** _______________ **[volver arriba](#indice)** ______________________________
_____
