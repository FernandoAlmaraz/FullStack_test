import fs from 'fs';
import path from 'path';
import axios from 'axios';
import unzipper from 'unzipper';

class FileHelper {
    static async downloadFile(zipUrl, downloadDir) {
        const fileName = path.basename(zipUrl);
        const filePath = path.join(downloadDir, fileName);

        const response = await axios({
            method: 'get',
            url: zipUrl,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(filePath));
            writer.on('error', reject);
        });
    }

    static async unzipFile(zipPath, outputDir) {
        try {
            const directory = fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: outputDir }));
            directory.on('close', () => {
                console.log(`Descompresión completada en: ${outputDir}`);
            });
        } catch (error) {
            console.error('Error al descomprimir el archivo:', error);
        }
    }

    static async downloadAndUnzip(zipUrl, outputDir) {
        try {
            const zipFilePath = await this.downloadFile(zipUrl, outputDir);

            await this.unzipFile(zipFilePath, outputDir);
            console.log('El archivo ZIP se descargó y descomprimió correctamente');
        } catch (error) {
            console.error('Error en la descarga o descompresión:', error);
        }
    }
}

export default FileHelper;
