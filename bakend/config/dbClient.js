// Cargar variables de entorno desde el archivo .env
import 'dotenv/config';
// Importar mongoose para gestionar la conexión a la base de datos MongoDB
import mongoose from 'mongoose';

/**
 * dbClient - Clase encargada de gestionar la conexión a la base de datos MongoDB.
 * 
 * Esta clase maneja la inicialización de la conexión, el manejo de errores de conexión
 * y proporciona un método para acceder a la instancia de la base de datos una vez conectada.
 * 
 * Uso típico:
 * - Primero se llama al método `connect()` para establecer la conexión con la base de datos.
 * - Luego, se puede usar el método `getDb()` para acceder a la base de datos una vez la conexión se ha establecido correctamente.
 */
class dbClient {
    // Instancia de la base de datos
    db = null;

    /**
     * Método para establecer la conexión con la base de datos MongoDB.
     * Utiliza la URI de conexión que se encuentra en las variables de entorno (.env).
     * 
     * @async
     * @throws {Error} Si ocurre un error durante la conexión, se imprime en consola.
     */
    async connect() {
        try {
            // Obtener la cadena de conexión desde las variables de entorno
            const queryString = process.env.MONGO_URI;

            // Conectar a MongoDB utilizando Mongoose
            await mongoose.connect(queryString, {
                useNewUrlParser: true,  // Usar el nuevo analizador de URL de MongoDB
                useUnifiedTopology: true  // Usar el nuevo motor de conexión de MongoDB
            });

            // Asignar la conexión activa a la propiedad `db`
            this.db = mongoose.connection;
            console.log("Connected successfully to db");

        } catch (e) {
            // Manejo de errores: Si la conexión falla, imprimir el error en consola
            console.log("Error connecting to DB:", e);
        }
    }

    /**
     * Método para obtener la instancia de la base de datos.
     * 
     * @returns {mongoose.Connection} La conexión activa de la base de datos.
     * @throws {Error} Si se intenta acceder a la base de datos antes de establecer la conexión.
     */
    getDb() {
        // Verificar si la base de datos ya ha sido conectada
        if (!this.db) {
            // Si la conexión no está establecida, lanzar un error
            throw new Error("Database not connected yet.");
        }
        // Si la conexión está establecida, devolver la instancia de la base de datos
        return this.db;
    }
}

// Exportar una única instancia de dbClient (patrón Singleton)
export default new dbClient();
