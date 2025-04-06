// Importaciones necesarias para el funcionamiento del controlador
import Folder from '../models/folder.js';  // Modelo de la colección de carpetas en MongoDB
import FileHelper from '../helpers/zipHelper.js';  // Helper para manejar la descarga y descompresión de archivos ZIP
import path from 'path';  // Módulo nativo de Node.js para manejar rutas de archivos
import 'dotenv/config';  // Cargar variables de entorno desde el archivo .env

// Definir el directorio base para la extracción de archivos ZIP
const BASE_DIR = path.join(process.cwd(), process.env.BASE_DIR);

/**
 * FileController - Controlador encargado de procesar la información de los archivos y carpetas,
 * incluyendo la descarga, descompresión y almacenamiento en la base de datos.
 * 
 * Contiene los métodos para procesar un archivo ZIP y obtener todos los registros de carpetas.
 */
class FileController {
    /**
     * Método estático para procesar la información de un archivo ZIP.
     * 
     * 1. Recibe una URL de un archivo ZIP.
     * 2. Descarga y descomprime el archivo ZIP usando el helper `FileHelper`.
     * 3. Guarda la información del archivo ZIP y sus archivos dentro de la base de datos MongoDB.
     * 
     * @param {Request} req - El objeto de la solicitud HTTP.
     * @param {Response} res - El objeto de la respuesta HTTP.
     * @returns {Promise<void>} Respuesta HTTP con el resultado del procesamiento.
     */
    static async processZipInfo(req, res) {
        // Desestructuramos la URL del archivo ZIP de la solicitud
        const { zipUrl } = req.body;
        if (!zipUrl) {
            // Si no se proporciona la URL, respondemos con un error
            return res.status(400).json({ error: 'Missing zipUrl' });
        }

        try {
            // Directorio donde se extraerá el contenido del archivo ZIP
            const outputDir = BASE_DIR;
            // Usamos el helper para descargar y descomprimir el archivo ZIP
            const zipInfo = await FileHelper.downloadAndUnzip(zipUrl, outputDir);

            // Parseamos la información del ZIP para obtener la carpeta y archivos
            const { folder } = JSON.parse(zipInfo);
            const { name, files } = folder;

            // Creamos un nuevo registro de carpeta en la base de datos
            const folderRecord = new Folder({
                name: name,
                files: files.map(file => ({
                    fileName: file.fileName,  // Nombre del archivo
                    path: file.path.replace(`${BASE_DIR}/`, '')  // Ruta relativa al directorio
                }))
            });

            // Guardamos el nuevo registro de carpeta en la base de datos
            await folderRecord.save();

            // Respondemos con un mensaje de éxito y el registro de la carpeta
            res.status(200).json({ message: 'ZIP processed successfully', folder: folderRecord });
        } catch (error) {
            // Si ocurre un error durante el procesamiento, lo manejamos
            console.error('Error en la descarga o descompresión:', error);
            res.status(500).json({ error: 'Error en el procesamiento del ZIP' });
        }
    }

    /**
     * Método estático para obtener todas las carpetas almacenadas en la base de datos.
     * 
     * @param {Request} req - El objeto de la solicitud HTTP.
     * @param {Response} res - El objeto de la respuesta HTTP.
     * @returns {Promise<void>} Respuesta HTTP con la lista de todas las carpetas.
     */
    static async getAllFolders(req, res) {
        try {
            // Buscamos todos los registros de carpetas en la base de datos
            const folders = await Folder.find();
            // Respondemos con una lista de todas las carpetas
            res.status(200).json(folders);
        } catch (error) {
            // Si ocurre un error al obtener las carpetas, lo manejamos
            console.error('Error al obtener las carpetas:', error);
            res.status(500).json({ error: 'Error al obtener los registros' });
        }
    }
}

// Exportamos el controlador para ser utilizado en las rutas
export default FileController;
