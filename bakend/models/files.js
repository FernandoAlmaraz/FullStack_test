import dbClient from "../config/dbClient.js";

class fileModel {
    async create(file) {
        const collFiles = dbClient.db.collection('test');
        await collFiles.insertOne(file);
        return true;
    }

    constructor() {

    }
}
export default new fileModel;