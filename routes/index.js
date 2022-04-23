import express from 'express';
import * as cityRoutes from './city/city.js';
const router = express.Router();


router.use('', cityRoutes.router);
export default router;
