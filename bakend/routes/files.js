import express from 'express';
import fileController from '../controllers/fileController.js';
const route = express.Router();

route.post('/', fileController.handleZipUpload);
route.get('/', fileController.listFiles);


export default route;