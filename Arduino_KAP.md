Documentando
# App para controlar un dispositivo pan-tilt para KAP, basado en Arduino y vía BT
Código base: From Sweep, by BARRAGAN `http://barraganstudio.com`. This example code is in the public domain.  
Añado código de lectura de valores desde el ejemplo `ReadASCIIString.ino`  
Leyendo el ejemplo de `BT_pruebas_L_Llamas`, compruebo que no hace falta especificar nada para usar el BT 
como puerto serie. Por tanto, con este código debería funcionar sin problemas desde una app de BT.  
Necesitamos una app que, desde un smartphone "controlador", permita operar la posición de cámara en la cometa, activando los servos conectados al Arduino.  
Adicionalmente, usando un segundo smartphone como cámara en la cometa, desde el controlador se podría comunicar también con la cámara para tomar fotos.  
Otro planteamiento: una app para el smartphone cámara, que ordene los cambios de posición al arduino, también en la cometa.  

## Versión App Inventor 2
La plataforma AI2 es muy fácil de usar, por lo que es mi primera opción. Uso de base una app anterior, llamada `Vision`, donde ya hay funciones de comunicación vía BT.  
El problema con AI2 es que no es posible programar la toma de fotos, por lo que una app de cámara no es posible, sólo podemos plantear la app para controlador.  


## Versión PhoneGap


