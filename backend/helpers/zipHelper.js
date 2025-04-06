// Importamos los módulos necesarios para manejar archivos, rutas y solicitudes HTTP
import fs from 'fs';  // Módulo de Node.js para interactuar con el sistema de archivos
import path from 'path';  // Módulo de Node.js para manejar rutas de archivos
import axios from 'axios';  // Librería para realizar solicitudes HTTP
import unzipper from 'unzipper';  // Librería para descomprimir archivos ZIP

/**
 * FileHelper - Clase con métodos estáticos para manejar la descarga y descompresión de archivos ZIP.
 * 
 * Los métodos disponibles permiten descargar archivos, descomprimirlos y filtrar los archivos HTML y XML
 * dentro de una estructura de carpetas.
 */
class FileHelper {
    /**
     * Método estático para descargar un archivo desde una URL.
     * 
     * 1. Realiza una solicitud GET para descargar el archivo ZIP.
     * 2. Guarda el archivo en el directorio especificado en el sistema local.
     * 
     * @param {string} zipUrl - URL desde la que se descargará el archivo ZIP.
     * @param {string} downloadDir - Directorio donde se guardará el archivo ZIP descargado.
     * @returns {Promise<string>} Ruta completa al archivo ZIP descargado.
     */
    static async downloadFile(zipUrl, downloadDir) {
        // Extraemos el nombre del archivo desde la URL
        const fileName = path.basename(zipUrl);
        // Generamos la ruta completa donde se guardará el archivo ZIP
        const filePath = path.join(downloadDir, fileName);

        // Realizamos la solicitud HTTP para descargar el archivo
        const response = await axios({
            method: 'get',
            url: zipUrl,
            responseType: 'stream',
        });

        // Creamos un stream de escritura para guardar el archivo
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        // Devolvemos una promesa que se resuelve cuando el archivo se haya descargado completamente
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(filePath));  // Resuelve con la ruta del archivo descargado
            writer.on('error', reject);  // Rechaza si ocurre un error
        });
    }

    /**
     * Método estático para descomprimir un archivo ZIP.
     * 
     * 1. Extrae los archivos del ZIP a un directorio.
     * 2. Filtra los archivos HTML y XML de la carpeta extraída.
     * 3. Devuelve la información de los archivos en formato JSON.
     * 
     * @param {string} zipPath - Ruta al archivo ZIP que se descomprimirá.
     * @param {string} outputDir - Directorio donde se extraerán los archivos.
     * @returns {Promise<string>} JSON con la información de la carpeta y archivos extraídos.
     */
    static async unzipFile(zipPath, outputDir) {
        return new Promise((resolve, reject) => {
            try {
                // Extraemos el nombre de la carpeta del archivo ZIP
                const fileName = path.basename(zipPath, '.zip');
                // Ruta al directorio donde se extraerán los archivos
                const targetDir = path.join(outputDir, fileName);

                // Si el directorio no existe, lo creamos
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                const htmlAndXmlFiles = [];  // Array para almacenar las rutas de archivos HTML y XML
                // Creamos un stream de lectura del archivo ZIP y lo extraemos
                const directory = fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: targetDir }));

                // Cuando la extracción se haya completado
                directory.on('close', () => {
                    // Leemos todos los archivos extraídos
                    const files = fs.readdirSync(targetDir);
                    files.forEach(file => {
                        const filePath = path.join(targetDir, file);
                        // Filtramos solo los archivos HTML y XML
                        if (file.endsWith('.html') || file.endsWith('.xml')) {
                            htmlAndXmlFiles.push(filePath);
                        }
                    });

                    // Estructura de resultado en formato JSON
                    const result = {
                        folder: {
                            name: fileName,  // Nombre de la carpeta (nombre del archivo ZIP)
                            files: htmlAndXmlFiles.map(filePath => ({
                                fileName: path.basename(filePath),  // Nombre del archivo
                                path: filePath  // Ruta completa del archivo
                            }))
                        }
                    };

                    // Convertimos el resultado a formato JSON
                    const json_dir = JSON.stringify(result, null, 2);
                    resolve(json_dir);  // Devolvemos el JSON con la estructura
                });

                // Si ocurre un error durante la extracción, lo rechazamos
                directory.on('error', (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);  // Rechazamos si ocurre un error en el bloque try
            }
        });
    }

    /**
     * Método estático para descargar y descomprimir un archivo ZIP.
     * 
     * 1. Llama a los métodos `downloadFile` y `unzipFile` para realizar ambas operaciones.
     * 2. Devuelve la información sobre los archivos extraídos.
     * 
     * @param {string} zipUrl - URL del archivo ZIP que se descargará.
     * @param {string} outputDir - Directorio donde se extraerán los archivos.
     * @returns {Promise<string>} Información sobre los archivos extraídos en formato JSON.
     */
    static async downloadAndUnzip(zipUrl, outputDir) {
        try {
            // Primero descargamos el archivo ZIP
            const zipFilePath = await this.downloadFile(zipUrl, outputDir);

            // Luego descomprimimos el archivo ZIP
            const filePathInfo = await this.unzipFile(zipFilePath, outputDir);
            return filePathInfo;  // Devolvemos la información de los archivos extraídos
        } catch (error) {
            // Capturamos y mostramos cualquier error que ocurra durante el proceso
            console.error('Error en la descarga o descompresión:', error);
        }
    }
}

// Exportamos la clase para que pueda ser utilizada en otras partes de la aplicación
export default FileHelper;
