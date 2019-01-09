# Apuntes sobre OpenCV

Durante unos meses estuve estudiando este software de visión artificial, visión por ordenador, etc. Fui recopilando información, código en Python, etc, y este es mi resumen.  

## Indice
- [Información básica](#información-básica)  
- [Entrenando una Custom Haar Cascade](#entrenando-una-custom-haar-cascade)  
  - [Referencias y tutoriales](#referencias-y-tutoriales) 
  - [Colecciones de Archivos cascades.xml](#colecciones-de-archivos-cascadesxml)  
  - [Create_samples](#create_samples)  
  - [Paso a paso](#paso-a-paso)  
  - [Errores y soluciones](#errores-y-soluciones)  
  - [Train_cascade](#train_cascade)  
  - [Numero de Etapas](#numero-de-etapas)  
  - [Ejemplo completo](#ejemplo-completo)  
  - [Código para hacer pruebas](#código-para-hacer-pruebas)  
  - [Pruebas con el contenido completo de una carpeta](#pruebas-con-el-contenido-completo-de-una-carpeta)  
  - [Tamaño de las imágenes de entrenamiento](#tamaño-de-las-imágenes-de-entrenamiento)  
  - [Tamaño del objeto a detectar](#tamaño-del-objeto-a-detectar)  
  - [Calidad de las imágenes de entrenamiento](#calidad-de-las-imágenes-de-entrenamiento)  
  - [](#)  
- [Adaptar una haar cascade a tracking.js](#adaptar-haar-cascade-a-tracking)  
- [Operaciones básicas](#operaciones-básicas)
  - [Crear una máscara de color](#crear-una-máscara-de-color)
  - [ Meclar dos imágenes](#meclar-dos-imágenes)
  - [Crear una imagen negra](#crear-una-imagen-negra)
  



### Información básica  
**Guía de OpenCV y Python**: En www.programarfacil.org  "INTRODUCCIÓN A LA VISIÓN ARTIFICIAL CON OPENCV Y PYTHON", de Luis del Valle. Es muy básica, pero para comenzar me ha servido.  

**"CURSO DE INTRODUCCIÓN A OPENCV Y PYTHON"**: de Rubén Crespo Cano. Muy bueno. Asequible, sencillo, claro, completo para iniciación. En GitHub: opencv-python/opencv-and-python.ipynb  (https://github.com/rcrespocano/opencv-python/blob/master/opencv-and-python.ipynb)  

**Curso "Detección de objetos"**, Universitat Autònoma de Barcelona. En Coursera.  
No es sencillo, pero sí completo.  

**Artículo "Detectar diferencias entre dos imágenes con OpenCV y Python"**: interesante, https://robologs.net/2016/04/21/detectar-diferencias-entre-dos-imagenes-con-opencv-y-python/  

Un buen resumen del proceso global: "How to train classifiers the best way possible"  http://answers.opencv.org/question/98754/how-to-train-classifiers-the-best-way-possible/  



## Entrenando una Custom Haar Cascade  

### Referencias y tutoriales 
**Mememememe**: una introducción muy completita sobre el entrenamiento de Cascades: Tiene un tuturial real, práctico, sobre cómo generar Haar Cascades con Android: https://memememememememe.me/post/training-haar-cascades/ , y otros recursos https://memememememememe.me/resources/  

**Tutorial Harrison**: Referencia útil para crear tu propia Haar Cascade usando Python: 
https://pythonprogramming.net/haar-cascade-object-detection-python-opencv-tutorial/ (Harrison@pythonprogramming.net)  

**Naotoshi Seo**: http://note.sonots.com/SciSoftware/haartraining.html , realmente es la base de casi todos los tutoriales que acabo viendo).  

**Tutorial Robin**: http://coding-robin.de/2013/07/22/train-your-own-opencv-haar-classifier.html, nueva referencia, muy muy step-by-step. También tiene una lista paso-a-paso, en Github: https://github.com/mrnugget/opencv-haar-classifier-training .   

**Docs de OpenCV**: Referencias básicas, _Face Detection using Haar Cascades_ (OpenCV 3.0.0-dev documentation » OpenCV-Python Tutorials » Object Detection » Face Detection using Haar Cascades, 
https://docs.opencv.org/3.0-beta/doc/py_tutorials/py_objdetect/py_face_detection/py_face_detection.html#face-detection);  
Cascade Classifier Training.  
OpenCV 2.4.13.6 documentation » OpenCV User Guide » Cascade Classifier Training
https://docs.opencv.org/2.4/doc/user_guide/ug_traincascade.html  

**"Training cascade files"** de Jeff Thompson: https://github.com/jeffThompson/MirrorTest/blob/master/TrainingInstructions.md . Me parece muy interesante, porque es una guía paso-a-paso, muy clara ahora que ya conozco el tema y he leído bastante material.  

**Dudas y FAQs** Un recurso interesante, mucha información práctica sobre dudas y FAQs, ordenada por etapas del proceso: http://www.computer-vision-software.com/blog/2009/11/faq-opencv-haartraining/   


### Colecciones de Archivos cascades.xml 
Hay una web con una recopilación de Haar Cascades, http://alereimondo.no-ip.org/OpenCV/34  
Aunque, básicamente, se pueden encontrar Haar Cascades.xml aquí:  https://github.com/opencv/opencv/tree/master/data/haarcascades  
Aquí también hay varios ficheros xml:  https://github.com/opencv/opencv_extra/tree/master/testdata/cv/dpm/VOC2007_Cascade  


## Create_samples
OpenCV suministra dos funciones para entrenar tu propia cascade, create_samples, y training_cascade, que corresponden a las dos etapas principales del proceso: creación de muestras y entranamiento.   
_Create_samples_ puede utilizarse de varias formas, obteniendo distintos resultados. A veces son equivalentes, otras no. Ejemplo: podemos crear una Cascade desde muestras en formato jpg y un fichero de anotaciones, o desde muestras en png y un fichero que referencia una lista de ficheros, cada uno con sus anotaciones; ambas válidas, ambas creadas desde _create_samples_. Además, con la misma herramienta, y en todos los casos, hay que generar un fichero .vec, que es el que realmente serivrá para entrenar la cascade.  
Todo eso se especifica con las diferentes _flags_, según se especifiquen o no.  

En resumen, __opencv_createsamples es una herramienta que realiza tres tareas__, según los parámetros que se especifiquen al ejecutarla:
1. __Crear un conjunto de imágenes positivas__, a partir de una única imagen del objeto y un conjunto de imágenes negativas.
En ese caso, puede generar tres situaciones:
- generar un fichero .vec como único resultado;
- generar un conjunto de imágenes JPG y un fichero .txt con la lista de ficheros de las imágenes;   
>*To obtain such behaviour the -img, -bg and -info keys should be specified.* 
En este caso, se generan las imágenes en PNG en el directorio 'info', junto a un fichero [name].lst, que contiene la información de los objetos incrustados, en este formato: 0001_0056_0028_0033_0033.jpg 1 56 28 33 33   
- generar un conjunto de imágenes PNG y un fichero .txt con la lista de ficheros y anotaciones.
>*To obtain such behaviour the -img, -bg, -info and -pngoutput keys should be specified.*
Hay que añadir el flag -pngoutput especificando el directorio donde se guardarán las imágenes.  
No obstante, creo que, si se añade también el flag -vec, no genera los png (o eso me ha pasado).  

2. __Convertir la colección de imágenes positivas, con sus anotaciones, en un fichero \*.vec.__
>*In order to create positive samples from such collection, -info argument should be specified instead of -img: -info \collection_file_name\  *

Después de crear un conjunto de imágenes positivas (ya sea con createsamples, o bien, porque tienes un montón de imágenes del objeto de tu interés), hay que generar el fichero vec correspondiente, a partir de las anotaciones (ya sean creadas por create samples {tanto desde las png como desde JPG y el correspondiente \[name].lst}, ya sean creadas anotando los objetos de todas tus imágenes manualmente o con la herramienta 'opencv_annotation.exe'{nota}).
>*Note that for training, it does not matter how vec-files with positive samples are generated. But opencv_createsamples utility is the only one way to collect/create a vector file of positive samples, provided by OpenCV.*

{nota} Para usar la herramienta 'opencv_annotation.exe', hay que especificar -images \ [example - /data/testimages/], -annotations \ [example - /data/annotations.txt], TIP: Use absolute paths to avoid any problems with the software!

3. __Mostrar el contenido del fichero \*.vec __.
>*In order to do this only -vec, -w and -h parameters should be specified.*  
Sólo con esos tres parámetros, la herramienta muestra las imágenes.

CONCLUSION: En cierto modo, hace falta aplicar la herramienta varias veces, en distintos modos, para preparar el conjunto de muestras positivas. Más tarde, entrenar el detector con la segunda herramienta (opencv_traincascade, la nueva versión, o bien opencv_haartraining, la antigua).  

## Paso a paso
1. Requirements
N/A  
2. Installing OpenCV.  
3. Gathering positive images  
Hay dos opciones: 
  - obtener muchas imágenes del objeto/s de interés: para al punto 6.  
  - generar muchas imágenes con UN objeto y opencv_createsamples.  
>*We're ready to create some positive samples now, based on the watch5050.jpg image. To do this, run the following via the terminal, while in the workspace:  
opencv_createsamples -img watch5050.jpg -bg bg.txt -info info/info.lst -pngoutput info -maxxangle 0.5 -maxyangle 0.5 -maxzangle 0.5 -num 1950  
What this does is creates samples, based on the **img** we specifiy, **bg** is the background information, **info** where we will put the info.list output (which is a lot like the bg.txt file), then the **-pngoutput** is wherever we want to place the newly generated images. Finally, we have some optional parameters to make our original image a bit more dynamic and then **-num** for the number of samples we want to try to create. Great, let's run that.  
Now you should have ~2,000 images in your info directory, and a file called info.lst. This file is your "positives" file basically. Open that up and peak at how it looks:  
0001_0014_0045_0028_0028.jpg 1 14 45 28 28  
First you have the file name, then you have how many of your objects is in the image, followed by all of their locations. We just have one, so it is the x, y, width, and height of the rectangle for the object within the image*.  
4. Crop and clean up  
Tamaño: *Anything between 640x480 and 1920x1080 seems to work just fine, and is well under the 1MB max size.*  
Siempre la misma relación de aspecto.  
Color: en principio, *convert them to grayscale*.  
Creo que en la carpeta de OpenCV hay una herramienta que ayuda a seleccionar el bounding box o ROI, para los casos en que se empleen muchas imágenes del objeto.  
5. "No black pixels", remove background  
Optional.  
6. Creating a collection file  
Es necesario un archivo de texto, que liste todas las imágenes positivas, especificando la ubicación y tamaño del objeto en cada imagen.  
También hay que obtener un archivo .vec, que combina todas las imágenes positivas. Esto se hace, también, con createsamples.  
>*Now that we have positive images, we now need to create the vector file, which is basically where we stitch all of our positive images together. We will actually be using opencv_createsamples again for this!  
opencv_createsamples -info info/info.lst -num 1950 -w 20 -h 20 -vec positives.vec  
That's our vector file. *  
Según Thompson:  
*opencv_createsamples -info collection.txt -bg negativeImages.txt -vec positiveVectorFile.vec -num numBoundingBoxes -w 32 -h 24*  
7. Gathering negative images  
Una colección de ficheros sin el objeto, pero de cualquier tamaño mayor del objeto a detectar.  
También, una lista de los ficheros, como bg.txt .   
8. Automated training  
*opencv_traincascade -data data -vec positives.vec -bg bg.txt -numPos 1800 -numNeg 900 -numStages 10 -w 20 -h 20*  
9. Test the results  
ver Naotoshi  

## Errores y soluciones
Recapitulando: los dos errores se han resuelto....  
- asegurando que se usan los mismos valores -w y -h tanto al generar los positivos como al entrenar el detector;  
- para create samples, la ruta es relativa, un directorio por debajo de la carpeta de proyecto;  
- para train cascade, la ruta debe ser completa: cuando la ruta de los negativos era completa en la lista de bg.txt;  
- Out of memory: cerrar aplicaciones, usar un procesador de 64 bits, que gestiona más memoria que el de 32.  

Sobre el mensaje "Required leaf false alarm rate achieved. Branch training terminated", leo http://answers.opencv.org/question/84852/traincascades-error-required-leaf-false-alarm-rate-achieved-branch-training-terminated/ .
Encuentro útil:
>*Change -maxFalseAlarmRate to for example 0.7, which forces individual stages to be more complex. This is what I suggest if you dont want to add data.*  



## Train_cascade 
Comienzo a leer sobre haar cascade training parameters, en http://answers.opencv.org/question/39160/opencv_traincascade-parameters-explanation-image-sizes-etc/
>*Keep in mind that **increase the number of positives will increase the generalization of your model**, it will look for better general features and will less likely overfit on your training data. **Increasing the number of negative images is needed to remove the large amount of false positive detections**. You want to supply as many situations as possible that don't look like your object here! Generally speaking they supply thousand of samples here to try to model general background noise for your application. Always keep in mind to carefully select your training data. It is better to 100 good natural occuring samples, than to use 1 good image and transform it 100 times with the available tools.*   

Un tutorial muy detallado, que comenta los parámetros de entrenamiento: https://github.com/robotics0001/FTC-Team-Level-Up-9261-Cascade-Classifier-Tutorial/wiki/Step-3:-Training  
>*Readjusting Parameters
Sometimes, when you test the cascade, it will either give you too many false positives or too many false negatives. **To deal with the issue of false negatives, you can either feed it more positive training data, or you can retrain it with a reduced number of negatives per stage**. To solve the problem of false negatives, you can captures each false negative image and retrain the cascade using those false positives as some of your background pictures (see notes about taking pictures with OpenCV on the FTC app).*  

Explicación de los parámetros de train_cascade, y entrenando una car cascade, por el indio Kumar: https://abhishek4273.com/2014/03/16/traincascade-and-car-detection-using-opencv/  

Otra interesante referencia: "Analysis and optimization of parameters used in training a cascade classifier", http://scholarpublishing.org/index.php/AIVP/article/view/1152.   

### Numero de Etapas
>*Now how to define how much stages you need? Start by adding for example 25 stages, and see how the returned acceptanceRatio is small enough. I usually suggest until it goes below 10^-5. After that you are overfitting the actual model from my experience.*  

### Ejemplo completo
Voy a probar a crear una nueva cascade con el móvil, para comprobar la influencia del tamaño de imagen de las muestras. También, para usar varias originales, hechas por mí.  
Puedo hacer dos pruebas, con las mismas imágenes positivas, adaptadas a los tamaños de las imágenes de fondo.  
Creo una carpeta nueva, llamada HaarBQ.    
Hago tres fotos del viejo BQ, genero 150 muestras a partir de cada una de ellas, verifico los números en haar-calculos.ods, y recorto el tamaño para cada una de las dos pruebas, adaptando a ambos tamaños.  
Recorto el BQ en las tres fotos.  
Paso a BN. En Fotografix, elimino lo correspondiente al fondo. Como es jpg, al grabar lo rellena de color (rojo, 240). Lo usaré como -bg transparente.  
Copio las fotos de Background a pruebaBG\background.  
Desde "Folder to TXT" genero la lista de los ficheros.    
Abro el txt, borro todo lo que no es rutas de ficheros (primeras y últimas), selecciono todo y copio.  
Pego en una hoja de LibreOffice-Calc, añado "background\" a todas las rutas mediante la función CONCATENAR, copio-y-pego en el txt, y lo grabo como "background_simple.txt".  
En Calc, añado la ruta absoluta a todas las rutas, copio-y-pego en txt, y lo grabo como "background_absolute.txt".  
Reduzco el tamaño de las fotos de los objetos, porque salta un error y son muy grandes.  
Las reduzco a la mitad, 550 x 950 aprox., renombrando a foto11, foto22, foto33.  
Para cada foto 1, 2, 3, ejecuto:  
>*{rutaPC}\Programas\PortableApps\PortableApps\opencv-2-4-31\build\x86\vc14\bin\opencv_createsamples -img {ruta}\my_apps\OpenCV\HaarBQ\ __foto11__.jpg -bg {ruta}\my_apps\OpenCV\HaarBQ\pruebaBG\background_simple.txt -info {ruta}\my_apps\OpenCV\HaarBQ\pruebaBG\info\ __info1__.lst -bgcolor 240 -maxxangle 0.5 -maxyangle 0.5 -maxzangle 0.5 -num 150 -w 16 -h 32   * 

Ojo con el valor de info.lst, para no machacarlo sucesivamente.  

Reuno todos los .lst en info.lst: abro los tres, copio-y-pego, renombro.    
Ahora el -vec:  

>*{rutaPC}\Programas\PortableApps\PortableApps\opencv-2-4-31\build\x86\vc14\bin\opencv_createsamples -info {ruta}\my_apps\OpenCV\HaarBQ\pruebaBG\info\info.lst -num 600 -vec {ruta}\my_apps\OpenCV\HaarBQ\pruebaBG\positives.vec -w 16 -h 32 *  

Aunque le pido 600 muestras, crea un vec con 450, según informa como mensaje después de ejecutarlo. Lógico, sólo había 150 x 3 = 450.  
Ahora, train_cascade.  
>*{rutaPC}\Programas\PortableApps\PortableApps\opencv-2-4-31\build\x86\vc14\bin\opencv_traincascade -data {ruta}\my_apps\OpenCV\HaarBQ\pruebaBG\data -vec {ruta}\my_apps\OpenCV\HaarBQ\pruebaBG\positives.vec -bg {ruta}\my_apps\OpenCV\HaarBQ\pruebaBG\background_absolute.txt -numPos 300 -numNeg 300 -numStages 10 -w 16 -h 32 *  

El último valor de acceptanceratio es 0.00095, así que amplío a 14 stages, quedando 8.2E-5.  El resultado es un fichero cascade.xml, en la carpeta Data.  


### Código para hacer pruebas
Código python para probar la cascade con varias fotografías:  
```python
# modificado, procedente de: https://pythonprogramming.net/haar-cascade-object-detection-python-opencv-tutorial/

import numpy as np
import cv2

ruta = "{tu-ruta}\OpenCV-Python\opencv-python-master\examples\haarcascade\\"

face_cascade = cv2.CascadeClassifier(ruta + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(ruta + 'haarcascade_eye.xml')

#this is the cascade we just made. Call what you want
#watch_cascade = cv2.CascadeClassifier("{ruta}\my_apps\OpenCV\cars\BuildingHaar\cascades\cascade-200-200-15.xml")
watch_cascade = cv2.CascadeClassifier("{ruta}\my_apps\OpenCV\HaarBQ\cascades\cascade-NEG-300-300-25.xml")

collection = [
"{ruta}\my_apps\OpenCV\HaarBQ\\test\IMG_1.jpg",
"{ruta}\my_apps\OpenCV\HaarBQ\\test\IMG_2.jpg",
"{ruta}\my_apps\OpenCV\HaarBQ\\test\IMG_3.png",
"{ruta}\my_apps\OpenCV\HaarBQ\\test\IMG_4.jpg",
"{ruta}\my_apps\OpenCV\HaarBQ\\test\IMG_5.jpg",
"{ruta}\my_apps\OpenCV\HaarBQ\\test\IMG_6.jpg",
"{ruta}\my_apps\OpenCV\HaarBQ\\test\IMG_7.jpg",
"{ruta}\my_apps\OpenCV\HaarBQ\\test\IMG_8.jpg"
]

for element in collection: 
    img = cv2.imread(element)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    # add this
    # image, reject levels, level weights.
    watches = watch_cascade.detectMultiScale(gray,2,1) # 50, 50)#
    print watches

    # add this
    for (x,y,w,h) in watches:
        cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)

    for (x,y,w,h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex,ey,ew,eh) in eyes:
            cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,128,0),2)
    
    cv2.imshow('img'+element, img)

    k = cv2.waitKey() & 0xff

    cv2.destroyAllWindows()

```
Código para probar con la webcam:  
```python
import numpy as np
import cv2

ruta = "{tu-ruta}\OpenCV-Python\opencv-python-master\examples\haarcascade\\"

face_cascade = cv2.CascadeClassifier(ruta + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(ruta + 'haarcascade_eye.xml')

#this is the cascade we just made. Call what you want
watch_cascade = cv2.CascadeClassifier("{ruta}\my_apps\OpenCV\HaarBQ\cascades\cascade-BG-300-300-16.xml")

cap = cv2.VideoCapture(0)

while 1:
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    # add this
    # image, reject levels, level weights.
    watches = watch_cascade.detectMultiScale(gray, 1.3, 1)
    
    # add this
    for (x,y,w,h) in watches:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,255,0),2)

    for (x,y,w,h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)

        
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex,ey,ew,eh) in eyes:
            cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)

    cv2.imshow('img',img)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
```
### Pruebas con el contenido completo de una carpeta  
Código python para probar la cascade con todas las fotografías de una carpeta:  
```python  
# modificado, procedente de: https://pythonprogramming.net/haar-cascade-object-detection-python-opencv-tutorial/

import numpy as np
import cv2
from os import walk

def ls(ruta = '.'):
    return next(walk(ruta))[2]

ruta2 = "{tu-ruta}\OpenCV\Biblio_tracking\\biblio_tracking\\www\\img"

tejuelo_cascade = cv2.CascadeClassifier("{tu-ruta}\OpenCV\Tejuelo\cascades\cascade-700-1400-19.xml")

collection = ls(ruta2)

print collection

for fichero in collection: 
    element = ruta2 + "\\" + fichero
    img = cv2.imread(element)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # add this
    # image, reject levels level weights.
    tejuelos = tejuelo_cascade.detectMultiScale(gray, 1.2, 5) # 50, 50)#
    print tejuelos

    # add this
    for (x,y,w,h) in tejuelos:
        cv2.rectangle(img,(x,y),(x+w,y+h),(0,250,0),2)

    cv2.imshow('img' + element, img)

    k = cv2.waitKey() & 0xff

    cv2.destroyAllWindows()
```

### Tamaño de las imágenes de entrenamiento
(de http://answers.opencv.org/question/39160/opencv_traincascade-parameters-explanation-image-sizes-etc/)  

Sobre el tamaño de las imágenes:  
>*In your positives folder you keep images that contain objects. Then your positives.txt file will be formatted image_location number_objects x1 y1 w1 h1 x2 y2 w2 h2 ... xN yN wN hN. This means that those regions will be cut out by the create samples tool and then resized to the model dimensions given at the -h and -w parameters of the tool. For your negative images **just supply a folder with tons of images that are larger than your model size your selected**. During training negative windows will get sampled from those larger images. At training time the -numNeg windows can thus be quite larger than the actual number of images.  

_Described images may be of different sizes. But each image should be (but not nessesarily) larger than a training window size, because these images are used to subsample negative image to the training size._ (https://docs.opencv.org/3.1.0/dc/d88/tutorial_traincascade.html)  


### Tamaño del objeto a detectar  
Sobre el tamaño del objeto, -w y -h, y su influencia: 
>*Like said before, **-w and -h are the model dimensions**, to which each new window is resized before training and which sizes are used to grab negative windows. No, you do not need to manually resize everything. Only think you should guarantee is that the **w:h ratio of your objects is about the same as the w:h ratio of the model** dimensions.  
Effect on the training procedure  
The larger the dimensions, the more features can be calculated and the more weak classifiers will be gathered for the boosting process.  
This also influences the amount of memory needed by the application, since all weak classifiers are stored in RAM memory during the process. **If you application crashes due to not enough memory, you will need to reduce your model size**.  

>Effect on the detection procedure  
*The __dimensions__ specify the __smallest object size__ you will be able to detect.  
Objects larger than that will be detected by the multiscale image pyramid approach.  
Smaller objects will be ignored since upscaling images to be able to detect them introduces way to much clutter and rescaling artefacts.*  

### Calidad de las imágenes de entrenamiento  
__Importante__ http://www.computer-vision-software.com/blog/2009/11/faq-opencv-haartraining/  
>_Should **lightning conditions and background** be various on positive images?_  
__Yes, it’s very important. On each positive image, beside object, there is background__. Try to fill this background with random noise, avoid constant background.  
_**How much background should be on positive image?**_  
If you have much background pixels on your positive images in comparison with object’s pixels – it’s bad since the haartraining could remember the background as feature of positive image.  
**If you don’t have background pixels at all – it’s also bad.** There should be small background frame on positive image  
_Should all original positive images have the same size?_  
No, **original images can have any size**.  But it’s important that width, height of this rectangle have the same aspect ratio as -w -h.  
_What’ s  -w and -h should I put in createsamples? Should it be always square?_  
You can put any value to -w and -h depend on aspect ratio of the target object which you want to detect.  **But objects of smaller size will not be detected!** For faces, commonly used values are 24×24, 20×20. But you may use 24×20, 20×24, etc.  
_Should negative images have the same size?  _
No. But the size should not be less than -w -h, which were put during vec file generation.  
_How many negative/positive image should I take?_
It depends on your task.  For real cascades there should be about 1000 positive images and 2000 negative images e.g.
Good enough proportion is  positive:negative = 1:2, but it’s not hard rule! I would recommend first to use small number of samples, generate cascade, test it, then enlarge number of samples.  

### Resumen parámetros de entrenamiento  
>**-numPos** number_of_positive_samples: This is the number of positive images used from your .vec file PER STAGE. It **SHOULD NOT be set to the total amount** of positive images in your .vec file. Initially, it should be set at around **80-90%** of the total number of images in the .vec file.  

>**-numNeg** number_of_negative_samples: This is the number of negative images used from your bg.txt file PER STAGE. It **SHOULD NOT be set to the total** amount of negative images listed in your bg.txt file. It should initially be set to **2x whatever the number of positives was**.  

>Readjusting Parameters: Sometimes, when you test the cascade, it will either give you **too many false positives** or **too many false negatives**. To deal with the issue of false negatives, you can either feed it **more positive** training data, or you can retrain it **with a reduced number of negatives per stage**. To solve the problem of false ~~negatives~~positives, you can **captures each false negative image and retrain** the cascade using those false positives as some of your background pictures (see notes about taking pictures with OpenCV on the FTC app).  

Kumar:  
>1)The number of **negative images must be greater than** the number of positive images.  
>2)Try to set npos = 0.9 * number_of_positive_samples and 0.99 as a minHitRate.  
>3)vec-file has to contain >= (npos + (numStages-1) * (1 – minHitRate) * numPose) + S, where S is a count of samples from vec-file. S is a count of samples from vec-file that can be recognized as background right away.  


## Muestras positivas por anotación
Es posible emplear imágenes reales con objeto, pero habría que annotarlas, es decir: señalar dónde está el objeto de interés. 
Sobre opencv_annotation.exe, información en http://answers.opencv.org/question/75083/documentation-for-opencv_annotation/  

Instrucción de anotación:
>{tu-ruta}\opencv-2-4-31\build\x86\vc14\bin\opencv_annotation -images {tu-ruta}\OpenCV\Tejuelo\otros\tejuelos_reales\recortados -annotations {tu-ruta}\OpenCV\Tejuelo\anotaciones.txt  

**Atención**: cada vez que se ejecuta (por ejmpleo, si haces grupos de imágenes, o interrumpes el proceso de anotación), la herramienta sobreescribe el nombre de archivo, no añade a lo que tuviera antes.  

Tips: clic en sup-izqda, clic en inf-drcha --> marco rojo; tecla C --> verde, graba; tecla N --> siguiente imagen.  

Para extraer los fotogramas empleo Video-to-video converter.  
Tools: video > frames. Settings: save images every 2 frames, size as original, generate filename videoname + numerator.  


## Adaptar haar cascade a tracking  
Ver este apartado en [Adaptar una haar cascade a tracking.js](https://github.com/luisgentil/apuntes/blob/master/Trackingjs.md)  

## Operaciones básicas
### Crear una máscara de color
Para crear una máscara de color hay que usar la función cv2.inRange, y dos valores: min y max de color.  
Se pueden hacer masks en RGB, no hace falta que sean solo HSV.  
Ejemplo: función *resume_lluvia*.

```python
## 'Función resume-lluvia' 
## Este código lee una imagen, extrae los puntos de color de cada tipo de lluvia, y lo acumula en una imagen 'final.png' 

import cv2
import numpy as np

def resume_lluvia(archivo):
    final ="images\\final.png"

    foto = cv2.imread(archivo)
    foto_fin = cv2.imread(final)
    
    #  Azul oscuro ,  Azul claro , Cyan , Verde oscuro ,  Verde medio ,  Verde claro 
    colores = [[0,0,252], [0,148,252], [0,252,252], [67, 131, 35], [0,192,0], [0,255,0]]
    
    for color in colores:
        if colores.index(color) == 0:
            foto_fin = dst = np.zeros((530, 480))
       
        # Take each frame

        # Convert BGR to HSV
        hsv = cv2.cvtColor(foto, cv2.COLOR_BGR2RGB)
       
        # define range of blue color in HSV
        lower_ = np.array(color)
        upper_ = np.array(color)

        # Threshold the HSV image to get only blue colors
        mask = cv2.inRange(hsv, lower_, upper_)

        # Bitwise-AND mask and original image
        res = cv2.bitwise_and(foto, foto, mask = mask)
        #print mask.shape, mask.dtype
        print "fin:", foto_fin.shape, res.dtype
        foto_fin = (foto_fin + mask)

        cv2.imshow('Original',foto)
        cv2.imshow('color', mask)
        cv2.imshow('resta', res)
        cv2.imshow('dst', foto_fin)

        cv2.waitKey(0)  # espera a cualquier tecla
        cv2.destroyAllWindows()

    cv2.imwrite(final, foto_fin)
```

### Meclar dos imágenes
mezclar imágenes: con cv.add(im1, im2).

### Crear una imagen negra
crea una imagen negra (todo 0): 
```python
black = np.zeros((530, 480, 3)) # tamaño en pixels, 3 canales
cv2.imwrite("images\\todo-negro.png", black)
```


_____
___________________ **[volver al índice de 'apuntes'](https://github.com/luisgentil/apuntes/blob/master/README.md)** _______________ **[volver arriba](#apuntes-sobre-opencv)** ______________________________
_____
