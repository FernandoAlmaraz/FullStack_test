# Backend Dockerizado para Proyecto Full Stack

Este proyecto contiene una API de backend construida con Node.js, Express y MongoDB. Se encuentra Dockerizado utilizando Docker Compose para facilitar su despliegue y desarrollo local.

## Requisitos previos

- Tener **Docker** instalado en tu máquina.
- Tener **Docker Compose** instalado.

Puedes seguir las instrucciones para instalar Docker desde su [página oficial](https://www.docker.com/get-started).

## Estructura del Proyecto

/bakend /config /controllers /helpers /models /routes /test .env app.js package.json docker-compose.yml swagger.yml

## Configuración del Proyecto

1. **Configuración del entorno local:**

   Asegúrate de que el archivo `.env` esté correctamente configurado con las variables necesarias:

PORT=5100 MONGO_URI='mongodb://admin:secret@mongodb:27017' BASE_DIR='./spaces' NODE_ENV=v1

2. **Dockerfile:**

El `Dockerfile` se utiliza para crear la imagen del contenedor backend, asegurando que todas las dependencias y configuraciones estén listas.

## Iniciar el Proyecto con Docker

### Paso 1: Clona este repositorio

Si aún no tienes el proyecto en tu máquina local, clónalo desde tu repositorio de Git:

```bash
git clone <tu-repositorio-url>
cd <directorio-del-proyecto>
Paso 2: Levantar los contenedores con Docker Compose
Con Docker y Docker Compose configurados, ejecuta el siguiente comando en tu terminal:
docker-compose up --build -d
--build: asegura que las imágenes de los contenedores se construyan antes de ser levantadas.

-d: ejecuta los contenedores en segundo plano.

Paso 3: Acceder a la API
La API de backend estará disponible en http://localhost:5100.

MongoDB estará disponible en mongodb://localhost:27017.

Volúmenes y Persistencia de Datos
Se utiliza un volumen llamado mongodb_data para persistir los datos de MongoDB y evitar que se pierdan cuando se detiene o elimina el contenedor de MongoDB.

Los archivos de tu backend están montados en el contenedor para que los cambios locales se reflejen en el contenedor sin tener que reiniciarlo manualmente.

Archivos Importantes
docker-compose.yml: Define los servicios (backend y MongoDB) y cómo interactúan entre sí.

Dockerfile: Especifica cómo construir la imagen del contenedor backend.

swagger.yml: Define la documentación de la API con Swagger.

.env: Contiene las variables de entorno utilizadas por la aplicación.

Desarrollo Local
Si realizas cambios en tu código local, Docker Compose está configurado para reflejar automáticamente esos cambios en el contenedor.

No es necesario reiniciar el contenedor manualmente si estás utilizando volúmenes para montar el directorio de tu proyecto.

Detener los Contenedores
Para detener los contenedores en segundo plano, utiliza el siguiente comando:
docker-compose down
Este comando detendrá y eliminará los contenedores, pero mantendrá los volúmenes y las redes.

Solución de Problemas
Si encuentras problemas con el contenedor o el contenedor de MongoDB, revisa los logs de los contenedores:
docker logs <container-name>
Esto te ayudará a diagnosticar problemas y ver si hay errores en el backend o en MongoDB.

¡Listo! Ahora deberías poder ejecutar tu proyecto en un entorno Dockerizado sin problemas.

