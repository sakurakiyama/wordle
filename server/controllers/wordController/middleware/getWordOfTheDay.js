import { WordOfTheDay } from '../../../models/model.js';

const getWordOfTheDay = async (req, res, next) => {
  try {
    const wordOfTheDay = await WordOfTheDay.findOne({});
    res.locals.word = wordOfTheDay;
    return next();
  } catch (error) {
    return next({
      log: `Error occured in wordController.getWordOfTheDay middleware: ${error}`,
      status: 400,
      message: { error: 'Unable to get the word of the day.' },
    });
  }
};

export default getWordOfTheDay;
