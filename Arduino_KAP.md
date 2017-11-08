*Documentando*
### App para controlar un dispositivo pan-tilt para KAP, basado en Arduino y vía BT
**Código base**: From Sweep, by BARRAGAN `http://barraganstudio.com`. This example code is in the public domain.  
Añado código de lectura de valores desde el ejemplo `ReadASCIIString.ino`  
Leyendo el ejemplo de `BT_pruebas_L_Llamas`, compruebo que no hace falta especificar nada para usar el BT 
como puerto serie. Por tanto, con este código debería funcionar sin problemas desde una app de BT.  
Necesitamos una app que, desde un smartphone "controlador", permita operar la posición de cámara en la cometa, activando los servos conectados al Arduino. Una derivada: conectar vía web-viewer con una cámara wifi, y obtener la visión de la cámara.    
Adicionalmente, usando un segundo smartphone como cámara en la cometa, desde el controlador se podría comunicar también con la cámara para tomar fotos.  
Otro planteamiento: una app para el smartphone cámara, que ordene los cambios de posición al arduino, también en la cometa.  

## Versión App Inventor 2
La plataforma AI2 es muy fácil de usar, por lo que es mi primera opción. Uso de base una app anterior, llamada `Vision`, donde ya hay funciones de comunicación vía BT. También, visión para una cámara WiFi.  
El problema con AI2 es que no es posible programar la toma de fotos, por lo que una app de cámara no es posible, sólo podemos plantear la app para controlador.  

### KAP Control - AI2
Comienzo usando dos sliders, ya que definir un canvas con dos sprites es muy complejo, de entrada. Ya cambiaré el layout cuando el código de envío e interpretación funcione bien.


## Versión PhoneGap
Para usar la cámara, plugin: `camera`.  
Para conocer la ubicación, incluyendo la orientación respecto al Norte (heading): `geolocation`.  
*heading: Direction of travel, specified in degrees counting clockwise relative to the true north. (Number)*  
También: cordova-plugin-device-orientation , PERO: *With the W3C Device Orientation API now being supported on iOS, Android and Windows devices, this plugin is not needed any more*. Y el enlace lleva a: https://www.w3.org/TR/orientation-event/  
PERO: esa web remite a otra actualizada, que dice: *Tener cuidado. Esta especificación ya no está en mantenimiento activo y el Grupo de trabajo de geolocalización no tiene la intención de mantenerla más.*. Así que usaré **cordova-plugin-device-orientation**.  

La versión más sencilla sería: tras evento device.ready, activar un evento periódico de 10 segundos, que toma una imagen, y después la carga en un canvas, mostrando algunos datos en una ventana de texto: nombre, fecha y hora, ...



