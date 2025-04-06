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
        return new Promise((resolve, reject) => {
            try {
                const fileName = path.basename(zipPath, '.zip');
                const targetDir = path.join(outputDir, fileName);

                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                const htmlAndXmlFiles = [];
                const directory = fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: targetDir }));

                directory.on('close', () => {
                    const files = fs.readdirSync(targetDir);
                    files.forEach(file => {
                        const filePath = path.join(targetDir, file);
                        if (file.endsWith('.html') || file.endsWith('.xml')) {
                            htmlAndXmlFiles.push(filePath);
                        }
                    });

                    const result = {
                        folder: {
                            name: fileName,
                            files: htmlAndXmlFiles.map(filePath => ({
                                fileName: path.basename(filePath),
                                path: filePath
                            }))
                        }
                    };

                    const json_dir = JSON.stringify(result, null, 2);
                    resolve(json_dir);
                });

                directory.on('error', (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    static async downloadAndUnzip(zipUrl, outputDir) {
        try {
            const zipFilePath = await this.downloadFile(zipUrl, outputDir);

            const filePathInfo = await this.unzipFile(zipFilePath, outputDir);
            return filePathInfo;
        } catch (error) {
            console.error('Error en la descarga o descompresión:', error);
        }
    }
}

export default FileHelper;
