import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';

/**
 * Configura la documentación interactiva de la API utilizando Swagger UI.
 * 
 * Este módulo configura una ruta `/api-docs` en la aplicación Express, que sirve
 * la interfaz gráfica de Swagger UI para visualizar la documentación de la API
 * a partir de un archivo de especificación YAML (`swagger.yml`). La integración
 * permite explorar y probar los endpoints de la API de manera visual e interactiva.
 * 
 * @param {Object} app - Instancia de la aplicación Express sobre la que se montará la ruta de Swagger UI.
 * 
 * @example
 * import setupSwagger from './setupSwagger';
 * 
 * // Configurar Swagger en la app Express
 * setupSwagger(app);
 */
const setupSwagger = (app) => {
    // Resuelve la ruta del archivo swagger.yml de manera independiente del sistema operativo.
    const swaggerFile = path.join(process.cwd(), 'swagger.yml');

    // Lee y parsea el archivo YAML que contiene la especificación Swagger.
    const swaggerDocument = YAML.parse(fs.readFileSync(swaggerFile, 'utf8'));

    // Configura la ruta '/api-docs' para servir la interfaz de Swagger UI con la especificación obtenida.
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
