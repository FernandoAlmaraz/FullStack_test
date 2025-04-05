import 'dotenv/config';
import { MongoClient } from 'mongodb';

class dbClient {
    constructor() {
        const queryString = process.env.MONGO_URI;
        this.client = new MongoClient(queryString);
        this.db = null;
    }

    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db('test');
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
