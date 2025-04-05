import dbClient from "../config/dbClient.js";

class fileModel {
    constructor() {
        this.collection = null;
    }

    async initialize() {
        if (!dbClient.db) {
            throw new Error("Database is not connected yet.");
        }
        this.collection = dbClient.db.collection('files');
    }

    async insertFile(fileData) {
        if (!this.collection) {
            throw new Error("Collection is not initialized. Call initialize() first.");
        }

        const result = await this.collection.insertOne(fileData);
        return result;
    }

    async getAllFiles() {
        if (!this.collection) {
            throw new Error("Collection is not initialized. Call initialize() first.");
        }

        return this.collection.find().toArray();
    }

    async getFileById(fileId) {
        if (!this.collection) {
            throw new Error("Collection is not initialized. Call initialize() first.");
        }

        return this.collection.findOne({ _id: fileId });
    }

    async updateFile(fileId, fileData) {
        if (!this.collection) {
            throw new Error("Collection is not initialized. Call initialize() first.");
        }

        const result = await this.collection.updateOne({ _id: fileId }, { $set: fileData });
        return result;
    }

    async deleteFile(fileId) {
        if (!this.collection) {
            throw new Error("Collection is not initialized. Call initialize() first.");
        }

        const result = await this.collection.deleteOne({ _id: fileId });
        return result;
    }
}

export default new fileModel();
