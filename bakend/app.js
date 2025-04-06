// Carga las variables de entorno desde el archivo .env, útil para mantener claves y configuraciones fuera del código fuente
import 'dotenv/config';

// Importa Express para construir el servidor web
import express from 'express';

// Importa las rutas relacionadas a archivos ZIP
import routefiles from './routes/files.js';

// Importa el cliente de conexión a la base de datos MongoDB
import dbClient from './config/dbClient.js';

// Importa la configuración de Swagger
import setupSwagger from './config/swagger.js';

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configuración de Swagger: añade la documentación de la API en la ruta '/api-docs'
setupSwagger(app);

// Registra las rutas bajo el prefijo '/v1'
app.use('/v1', routefiles);

/**
 * Control de entorno: si no estamos en modo test, arrancamos el servidor de forma normal.
 * Esta condición permite que los tests importen `app` sin iniciar el servidor,
 * evitando conflictos con puertos y asegurando entornos aislados.
 */
if (process.env.NODE_ENV !== 'test') {
    (async () => {
        try {
            // Conexión a la base de datos antes de iniciar el servidor
            await dbClient.connect();
            const PORT = process.env.PORT || 5000;

            // Inicio del servidor
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        } catch (error) {
            console.log("Error starting server:", error);
        }
    })();
} else {
    // En entorno de test, se realiza la conexión a la base sin levantar el servidor.
    // Esto permite testear rutas directamente con Supertest.
    await dbClient.connect();
}

// Exportamos la instancia de la app para usarla en tests o en otros módulos si es necesario
export default app;
