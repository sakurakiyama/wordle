import { Router } from 'express';
import wordController from '../controllers/wordController/index.js';

const router = Router();

router.get('/getWordOfTheDay', wordController.getWordOfTheDay, (req, res) => {
  return res.status(200).json(res.locals.word);
});
export default router;
