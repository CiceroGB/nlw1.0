import express from 'express';
import ItemsController from './controllers/itemController';

const routes = express.Router();

routes.get('/items', ItemsController.index);

export default routes;
