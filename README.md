 Este codigo es un complemento de la tecnica completa en este doc: https://matestampa.github.io/Portfolio/src/docs/4-ErrHandling/TecnicaServer.html

En este ejemplo solo vamos a contemplar elementos del proyecto como los controllers, los servicios, y la carpeta de error_handling. Se
van a dejar de lado las rutas, los middlewares y la configuraciones de la app, para que sea mas claro. 

Dicho esto se va a partir de que el controller recibe una request y de ahi en adelante sigue el flujo del codigo. Por lo tanto el punto de entrada es el archivo en la carpteta "controllers".
    
Aqui tenemos un diagrama que explica ese flujo, y como se va aplicando esta tecnica de "error-handling":

![Captura de pantalla 2024-02-08 023020](https://github.com/Matestampa/Error-Handling-technique-example/assets/69252997/4e0d6e70-df69-449c-ad08-9d9f7ffa3572)
