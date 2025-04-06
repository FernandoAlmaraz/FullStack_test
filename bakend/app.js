import 'dotenv/config';
import express from 'express';
import routefiles from './routes/files.js';
import dbClient from './config/dbClient.js';

const app = express();
app.use(express.json());
app.use('/file', routefiles)


async function startServer() {
    try {
        await dbClient.connect();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error starting server:", error);
    }
}

startServer();
