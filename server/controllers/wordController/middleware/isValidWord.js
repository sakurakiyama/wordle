import { Words } from '../../../models/model.js';

const isValidWord = async (req, res, next) => {
  try {
    const { attempt } = req.params;
    const foundWord = await Words.findOne({ word: attempt.toLowerCase() });

    foundWord ? (res.locals.foundWord = true) : (res.locals.foundWord = false);
    return next();
  } catch (error) {
    return next({
      log: `Error occured in wordController.isValidWord middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to validate word.' },
    });
  }
};

export default isValidWord;
