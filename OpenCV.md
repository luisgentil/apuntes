# Apuntes sobre OpenCV

Durante unos meses estuve estudiando este software de visión artificial, visión por ordenador, etc. Fui recopilando información, código en Python, etc, y este es mi resumen.  

### Información básica  
**Guía de OpenCV y Python**: En www.programarfacil.org  "INTRODUCCIÓN A LA VISIÓN ARTIFICIAL CON OPENCV Y PYTHON", de Luis del Valle. Es muy básica, pero para comenzar me ha servido.  

**"CURSO DE INTRODUCCIÓN A OPENCV Y PYTHON"**: de Rubén Crespo Cano. Muy bueno. Asequible, sencillo, claro, completo para iniciación. En GitHub: opencv-python/opencv-and-python.ipynb  (https://github.com/rcrespocano/opencv-python/blob/master/opencv-and-python.ipynb)  

**Curso "Detección de objetos"**, Universitat Autònoma de Barcelona. En Coursera.  
No es sencillo, pero sí completo.  

**Artículo "Detectar diferencias entre dos imágenes con OpenCV y Python"**: interesante, https://robologs.net/2016/04/21/detectar-diferencias-entre-dos-imagenes-con-opencv-y-python/  



### Entrenando una Custom Haar Cascade  

#### Referencias y tutoriales 
**Mememememe**: una introducción muy completita sobre el entrenamiento de Cascades: Tiene un tuturial real, práctico, sobre cómo generar Haar Cascades con Android: https://memememememememe.me/post/training-haar-cascades/ , y otros recursos https://memememememememe.me/resources/  

**Tutorial Harrison**: Referencia útil para crear tu propia Haar Cascade usando Python: 
https://pythonprogramming.net/haar-cascade-object-detection-python-opencv-tutorial/ (Harrison@pythonprogramming.net)  

**Naotoshi Seo**: http://note.sonots.com/SciSoftware/haartraining.html , realmente es la base de casi todos los tutoriales que acabo viendo).  

**Tutorial Robin**: http://coding-robin.de/2013/07/22/train-your-own-opencv-haar-classifier.html, nueva referencia, muy muy step-by-step.  

**Docs de OpenCV**: Referencias básicas, _Face Detection using Haar Cascades_ (OpenCV 3.0.0-dev documentation » OpenCV-Python Tutorials » Object Detection » Face Detection using Haar Cascades, 
https://docs.opencv.org/3.0-beta/doc/py_tutorials/py_objdetect/py_face_detection/py_face_detection.html#face-detection);  
Cascade Classifier Training
OpenCV 2.4.13.6 documentation » OpenCV User Guide » Cascade Classifier Training
https://docs.opencv.org/2.4/doc/user_guide/ug_traincascade.html

#### Colecciones de Archivos cascades.xml 
Hay una web con una recopilación de Haar Cascades, http://alereimondo.no-ip.org/OpenCV/34  
Aunque, básicamente, se pueden encontrar Haar Cascades.xml aquí:  https://github.com/opencv/opencv/tree/master/data/haarcascades  
Aquí también hay varios ficheros xml:  https://github.com/opencv/opencv_extra/tree/master/testdata/cv/dpm/VOC2007_Cascade  



