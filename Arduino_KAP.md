*Documentando*
### App para controlar un dispositivo pan-tilt para KAP, basado en Arduino y vía BT
Necesitamos un código arduino para controlar la placa, con dos servos que mueven un sistema Pan-Tilt.  
Necesitamos una app que, desde un smartphone "controlador", permita operar la posición de cámara en la cometa, activando los servos conectados al Arduino. Una derivada: conectar vía web-viewer con una cámara wifi, y obtener la visión de la cámara.    
Adicionalmente, usando un segundo smartphone como cámara en la cometa, desde el controlador se podría comunicar también con la cámara para tomar fotos.  
Otro planteamiento: una app para el smartphone cámara, que ordene los cambios de posición al arduino, también en la cometa.  

## Arduino
**Código base**: From Sweep, by BARRAGAN `http://barraganstudio.com`. This example code is in the public domain.  
Añado código de lectura de valores desde el ejemplo `ReadASCIIString.ino`  
Leyendo el ejemplo de `BT_pruebas_L_Llamas`, compruebo que no hace falta especificar nada para usar el BT 
como puerto serie. Por tanto, con este código debería funcionar sin problemas desde una app de BT.  
El 08/11 hago pruebas, y el sistema se comporta de una manera muy rara. No sé qué pasa, así que voy a ir descartando posibles fallos.  
· Los servos no descansan, están intentando moverse, como si estuvieran forzados. Probé con el miniservo de BQ, y se movía sin parar (y sin órdenes).  
· Reviso el código, y no veo nada raro, miro otro ejemplo de cómo controlar dos servos desde Serial y es similar, usa el bucle while, etc. Hace attach en pines 9 y 10. Habría que probarlo en la placa. Ref: https://robologs.net/2015/07/18/tutorial-de-arduino-controlar-dos-servos-por-serial/  
· Leo sobre salidas PWM, y resulta que no siempre es compatible (ver apartado "Incompatibilidades" de la referencia):  
"`**Incompatibilidades**  
El uso de los Timer no es exclusivo de las salidas PWM, si no que es compartido con otras funciones. Emplear funciones que requieren el uso de estos Timer supondrá que no podremos emplear de forma simultánea alguno de los pines PWM. A continuación alguna de las incompatibilidades más frecuentes  
*Servo*
La librería servo hace un uso intensivo de temporizadores por lo que, mientras la estemos usando, no podremos usar algunas de las salidas PWM. En el caso de Arduino Uno, Mini y Nano, la librería servo usa el Timer 1, por lo que **no podremos usar los pines 9 y 10 mientras usemos un servo**."`. Referencia: https://www.luisllamas.es/salidas-analogicas-pwm-en-arduino/  
No obstante, en la web de Luis Llamas hay ejemplos de servos conectados a pin 9 y pin10, así que no veo claro que esa sea la causa,...  
· Otra advertencia que he leído por ahí: "*Al usar varias fuente de tensión recordar poner siempre en común todos los GND. De lo contrario podríais dañar algún componente.*".  
· Otra cuestión a tener en cuenta: "*En general, la alimentación a los servos se realizará desde una fuente de tensión externa (una batería o fuente de alimentación) a una tensión de 5V-6.5V, siendo 6V la tensión idónea. Arduino puede llegar a proporcionar corriente suficiente para encender un servo pequeño (SG90), suficiente para hacer unos cuantos proyectos de prueba.
Sin embargo no dispone de corriente suficiente para actuar un servo grande (MG996R). Incluso varios servos pequeños, o hacer excesiva fuerza con ellos puede exceder la capacidad de corriente de Arduino, provocando su reinicio.*"  
 

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



