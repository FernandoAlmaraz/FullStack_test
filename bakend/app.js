import 'dotenv/config';
import express from 'express';
import routefiles from './routes/files.js';

const app = express();

app.use('/file', routefiles);
app.use(express.urlencoded({ extended: true }));

try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
catch (e) {
    console.log(e);
}
