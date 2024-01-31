import { Router } from 'express';
import wordController from '../controllers/wordController/index.js';

const router = Router();

router.get('/getWordOfTheDay', wordController.getWordOfTheDay, (req, res) => {
  return res.status(200).json(res.locals.word);
});

router.get('/isValidWord/:attempt', wordController.isValidWord, (req, res) => {
  return res.status(200).json(res.locals.foundWord);
});
export default router;
