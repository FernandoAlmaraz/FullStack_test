// Importa el helper que contiene la lógica de descarga de archivos
import FileHelper from '../../helpers/zipHelper.js';

// Grupo de pruebas para la clase FileHelper
describe('ZipHelper', () => {
    /**
     * Test: Verifica que la función downloadFile maneje adecuadamente URLs inválidas
     * 
     * - Simula una URL inválida para la descarga de un archivo
     * - Se espera que la promesa rechace y lance un error
     * - Se establece un timeout extendido de 10 segundos para evitar posibles retrasos en la simulación
     */
    it('downloadFile debería rechazar si la URL es inválida', async () => {
        // Ejecuta la función downloadFile con una URL inexistente
        await expect(
            FileHelper.downloadFile('https://url-no-existe.com/archivo.zip', './')
        ).rejects.toThrow(); // Verifica que se lance un error al intentar descargar
    }, 10000); // Timeout de 10 segundos para cubrir posibles retardos en la simulación
});
