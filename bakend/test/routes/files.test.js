// Importa la librería de pruebas 'supertest' y la aplicación Express para realizar las pruebas
import request from 'supertest';
import app from '../../app.js';

// Descripción del grupo de pruebas para las rutas /file
describe('Rutas /file', () => {
    /**
     * Test: Verifica que la ruta GET /file responda con un código 200
     * 
     * - Realiza una petición GET a la ruta /file
     * - Se espera que la respuesta tenga un código de estado 200, lo cual indica éxito
     * - Timeout extendido de 10 segundos para prevenir que la prueba se quede esperando por largos periodos
     */
    it('GET /file responde con código 200', async () => {
        const res = await request(app).get('/file'); // Realiza la solicitud GET
        expect(res.statusCode).toBe(200); // Verifica que el código de estado sea 200
    }, 10000); // Timeout de 10 segundos

    /**
     * Test: Verifica que la ruta POST /file con un body vacío retorne un error 400
     * 
     * - Realiza una solicitud POST a /file con un cuerpo vacío (sin zipUrl)
     * - Se espera que la respuesta tenga un código de estado 400, que indica una solicitud incorrecta
     * - Se espera que la respuesta contenga un error, el cual debe estar definido
     */
    it('POST /file con zipUrl vacío debe retornar error', async () => {
        const res = await request(app).post('/file').send({}); // Envío de un body vacío
        expect(res.statusCode).toBe(400); // Verifica que el código de estado sea 400
        expect(res.body.error).toBeDefined(); // Verifica que la respuesta contenga un campo 'error'
    }, 10000); // Timeout de 10 segundos
});
