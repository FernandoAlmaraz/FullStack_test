import Folder from '../models/folder.js';
import FileHelper from '../helpers/zipHelper.js';
import path from 'path';
import 'dotenv/config';

const BASE_DIR = path.join(process.cwd(), process.env.BASE_DIR);

class FileController {
    static async processZipInfo(req, res) {
        const { zipUrl } = req.body;
        if (!zipUrl) return res.status(400).json({ error: 'Missing zipUrl' });

        try {
            const outputDir = BASE_DIR;
            const zipInfo = await FileHelper.downloadAndUnzip(zipUrl, outputDir);

            const { folder } = JSON.parse(zipInfo);
            const { name, files } = folder;

            const folderRecord = new Folder({
                name: name,
                files: files.map(file => ({
                    fileName: file.fileName,
                    path: file.path.replace(`${BASE_DIR}/`, '')
                }))
            });

            await folderRecord.save();

            res.status(200).json({ message: 'ZIP processed successfully', folder: folderRecord });
        } catch (error) {
            console.error('Error en la descarga o descompresión:', error);
            res.status(500).json({ error: 'Error en el procesamiento del ZIP' });
        }
    }

    static async getAllFolders(req, res) {
        try {
            const folders = await Folder.find();
            res.status(200).json(folders);
        } catch (error) {
            console.error('Error al obtener las carpetas:', error);
            res.status(500).json({ error: 'Error al obtener los registros' });
        }
    }
}

export default FileController;
