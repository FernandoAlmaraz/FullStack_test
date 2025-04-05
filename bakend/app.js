import 'dotenv/config';
import express from 'express';
import routefiles from './routes/files.js';
import dbClient from './config/dbClient.js';
import fileModel from './models/files.js';

const app = express();
app.use(express.json());
app.use('/file', routefiles)
app.get('/', (req, res) => {
    res.send("API is working!");
});

async function startServer() {
    try {
        await dbClient.connect();
        await fileModel.initialize();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error starting server:", error);
    }
}

startServer();
