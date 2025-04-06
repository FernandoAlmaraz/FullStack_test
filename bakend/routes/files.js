import express from 'express';
import FileController from '../controllers/fileController.js';
const route = express.Router();

route.post('/', FileController.processZipInfo);
route.get('/', FileController.getAllFolders);


export default route;