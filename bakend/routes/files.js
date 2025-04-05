import express from 'express';
import fileController from '../controllers/fileController.js';
const route = express.Router();

route.post('/', fileController.create);
route.get('/', fileController.getAll);
route.get('/:id', fileController.getOne);
route.put('/:id', fileController.update);
route.delete('/:id', fileController.delete);


export default route;