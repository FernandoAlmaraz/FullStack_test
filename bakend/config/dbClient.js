import 'dotenv/config';
import mongoose from 'mongoose';

class dbClient {
    constructor() {
        this.db = null;
    }

    async connect() {
        try {
            const queryString = process.env.MONGO_URI;

            await mongoose.connect(queryString);

            this.db = mongoose.connection;
            console.log("Connected successfully to db");

        } catch (e) {
            console.log("Error connecting to DB:", e);
        }
    }

    getDb() {
        if (!this.db) {
            throw new Error("Database not connected yet.");
        }
        return this.db;
    }
}

export default new dbClient();
