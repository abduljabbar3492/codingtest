import express from 'express';
import cityController from '../../controllers/city.js';
const router = express.Router();

router.route('/suggestions').get(cityController.getSuggestions);

export { router };