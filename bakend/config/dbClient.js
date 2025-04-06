// Carga variables de entorno desde un archivo .env
import 'dotenv/config';

// Importa el ODM de MongoDB para Node.js
import mongoose from 'mongoose';

/**
 * Clase dbClient
 * Encapsula la lógica de conexión a MongoDB utilizando Mongoose.
 * Se implementa como un singleton para mantener una única instancia de conexión en toda la aplicación.
 */
class dbClient {
    constructor() {
        // Almacena la instancia de conexión activa a la base de datos
        this.db = null;
    }

    /**
     * Establece la conexión a la base de datos utilizando Mongoose.
     * La URI de conexión se toma desde las variables de entorno (.env).
     */
    async connect() {
        try {
            const queryString = process.env.MONGO_URI;

            // Conecta con MongoDB utilizando la URI proporcionada
            await mongoose.connect(queryString);

            // Almacena la conexión actual
            this.db = mongoose.connection;

            console.log("Connected successfully to db");
        } catch (e) {
            // En caso de error, se captura y muestra en consola
            console.log("Error connecting to DB:", e);
        }
    }

    /**
     * Devuelve la instancia actual de la conexión a la base de datos.
     * Lanza un error si aún no se ha establecido una conexión.
     * @returns {mongoose.Connection} Instancia activa de conexión a MongoDB
     */
    getDb() {
        if (!this.db) {
            throw new Error("Database not connected yet.");
        }
        return this.db;
    }
}

// Exporta una instancia única de la clase para uso global en la aplicación
export default new dbClient();
