import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();
/*
GET home page.
*/
router.get('/', AppController.getIndexPage);
router.get('/load', AppController.loadBusesData);
router.get('/buses/:id', AppController.getBusDetailsByID);
router.get('/buses', AppController.getBusesData);


export default router;
