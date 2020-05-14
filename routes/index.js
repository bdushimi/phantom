import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();
/*
GET home page.
*/
router.get('/', AppController.getIndexPage);
router.get('/load', AppController.loadData);
router.get('/buses/:id', AppController.getBusData);
router.get('/buses', AppController.getBusesData);


export default router;
