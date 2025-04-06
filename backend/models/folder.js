// models/folder.js
import mongoose from 'mongoose';  // Importamos el módulo de mongoose para trabajar con MongoDB

/**
 * Esquema para representar los archivos que están dentro de una carpeta.
 * 
 * Cada archivo contiene:
 * - fileName: El nombre del archivo (requerido).
 * - path: La ruta donde se encuentra el archivo dentro del sistema (requerido).
 */
const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },  // Nombre del archivo
    path: { type: String, required: true }  // Ruta del archivo dentro del sistema
});

/**
 * Esquema para representar una carpeta, que contiene un conjunto de archivos.
 * 
 * Cada carpeta tiene:
 * - name: El nombre de la carpeta (requerido).
 * - files: Un arreglo de archivos que pertenecen a esa carpeta (de tipo fileSchema).
 * 
 * También se añade la opción `{ timestamps: true }`, lo que permitirá que mongoose
 * agregue automáticamente los campos `createdAt` y `updatedAt` a cada documento.
 */
const folderSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Nombre de la carpeta (requerido)
    files: [fileSchema]  // Arreglo de archivos dentro de la carpeta
}, { timestamps: true });  // Añadimos timestamps para `createdAt` y `updatedAt`

/**
 * Modelo de mongoose para la colección 'Folder', que representa las carpetas en MongoDB.
 * 
 * El modelo se asocia al esquema `folderSchema` y se utiliza para realizar operaciones
 * CRUD (Crear, Leer, Actualizar, Eliminar) sobre la colección de carpetas.
 */
const Folder = mongoose.model('Folder', folderSchema);

// Exportamos el modelo para que se pueda usar en otros archivos de la aplicación.
export default Folder;
