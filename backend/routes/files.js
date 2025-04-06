// routes/files.js
import express from 'express';  // Importamos el módulo express para crear rutas
import FileController from '../controllers/fileController.js';  // Importamos el controlador para manejar las solicitudes

// Creamos un enrutador utilizando express.Router()
const route = express.Router();

/**
 * Ruta POST para procesar la información del archivo ZIP.
 * 
 * Esta ruta se utiliza para recibir la URL de un archivo ZIP, procesarlo (descargarlo y descomprimirlo),
 * y almacenar la información de los archivos dentro del ZIP en la base de datos.
 * 
 * Método: POST
 * Endpoint: / (root de esta ruta)
 * 
 * @param {Object} req - La solicitud HTTP que contiene el cuerpo con la URL del archivo ZIP.
 * @param {Object} res - La respuesta HTTP para enviar de vuelta al cliente.
 */
route.post('/addFolder', FileController.processZipInfo);  // Ruta que procesa la URL del ZIP

/**
 * Ruta GET para obtener todos los registros de carpetas.
 * 
 * Esta ruta recupera todas las carpetas almacenadas en la base de datos y las devuelve al cliente.
 * 
 * Método: GET
 * Endpoint: / (root de esta ruta)
 * 
 * @param {Object} req - La solicitud HTTP (en este caso no se utiliza cuerpo, solo el endpoint).
 * @param {Object} res - La respuesta HTTP para enviar la lista de carpetas.
 */
route.get('/showFolders', FileController.getAllFolders);  // Ruta que obtiene todas las carpetas

// Exportamos la ruta para ser utilizada en la aplicación principal.
export default route;
