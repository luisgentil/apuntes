# Apuntes sobre Python
#### Indice
*(Incluye también notas sobre módulos, hasta que sean tan grandes que se hagan independientes)*.  

- [Numpy](#numpy)  
- [Scipy](#scipy)  
- [Matplotlib](#matplotlib)  
- [OpenCV](#opencv)  
- [PIL](#pil)  
- [](#)

### Numpy 

### Scipy

### Matplotlib

### OpenCV
Básicamente, hay que tener en cuenta lo que ya resumí en [Apuntes sobre OpenCV](https://github.com/luisgentil/apuntes/blob/master/OpenCV.md)  
No es posible leer directamente GIF con CV2, (ver [este enlace](http://answers.opencv.org/question/185929/how-to-read-gif-in-python/ )). Hay que convertirlo en png previamente. Por eso acudí a PIL.   

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


_____
___________________ **[volver al índice de 'apuntes'](https://github.com/luisgentil/apuntes/blob/master/README.md)** _______________ **[volver arriba](#indice)** ______________________________
_____
