import 'dotenv/config';
import { MongoClient } from "mongodb";


class dbClient {
    constructor() {
        const queryString = process.env.MONGO_URI;
        this.client = new MongoClient(queryString);
        this.connect();
    }
    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db('test');
            console.log("Connected successfully to db")
        }
        catch (e) {
            console.log(e);
        }
    }
}
export default new dbClient;