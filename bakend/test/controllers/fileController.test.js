// Importa Supertest para simular peticiones HTTP al servidor
import request from 'supertest';

// Importa la instancia de la app para testear sin iniciar un servidor real
import app from '../../app.js';

// Grupo de pruebas para el controlador FileController
describe('FileController', () => {
    /**
     * Test: Verifica que el endpoint GET /v1/showFolders responda correctamente
     * 
     * - Espera un código de estado 200, indicando éxito
     * - Valida que la respuesta sea un array, como se espera del listado de carpetas/archivos
     * - Se asigna un timeout extendido (10 segundos) por si hay latencias en la conexión o DB
     */
    it('GET /v1/showFolders debe retornar 200 y un array', async () => {
        const res = await request(app).get('/v1/showFolders');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }, 10000); // Timeout aumentado por posibles retardos en DB
});
