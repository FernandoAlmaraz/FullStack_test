import 'dotenv/config';
import FileModel from '../models/files.js';
import FileHelper from '../helpers/zipHelper.js';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), process.env.BASE_DIR);

class FileController {
    async handleZipUpload(req, res) {
        const { zipUrl } = req.body;
        if (!zipUrl) return res.status(400).json({ error: 'Missing zipUrl' });

        try {
            const outputDir = BASE_DIR;
            await FileHelper.downloadAndUnzip(zipUrl, outputDir);
            const files = fs.readdirSync(outputDir);
            console.log(files);
            /*
            const dbRecords = files.map(file => ({
                name: file,
                path: path.join(outputDir, file),
                createdAt: new Date()
            }));
            await FileModel.insertFile(dbRecords);

            res.status(200).json({ message: 'ZIP processed successfully', files: dbRecords });
            */
            res.status(200).json({ message: 'ZIP processed successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error processing ZIP' });
        }
    }

    async listFiles(req, res) {
        try {
            const files = await FileModel.getAllFiles();
            res.status(200).json(files);
        } catch (err) {
            res.status(500).json({ error: 'Error fetching files' });
        }
    }
}

export default new FileController();
