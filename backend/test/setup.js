// Importación de dependencias necesarias
import mongoose from 'mongoose';
import dbClient from '../config/dbClient.js'; // Asegúrate de que tu dbClient esté exportado correctamente

// Antes de todas las pruebas, nos aseguramos de que la conexión con la base de datos se haya realizado
beforeAll(async () => {
    await dbClient.connect(); // Conecta a la base de datos antes de las pruebas
});

// Después de todas las pruebas, cerramos la conexión con la base de datos
afterAll(async () => {
    await mongoose.connection.close(); // Cierra la conexión después de las pruebas
});
