import express, { json, urlencoded } from 'express';
import cors from 'cors';
import wordRouter from './routes/words.js';
import { WordOfTheDay, Words } from './models/model.js';
import cron from 'node-cron';

const PORT = 8080;
const app = express();
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

async function updateWord() {
  try {
    // Remove the current word of the day
    const currentWordOfTheDay = await WordOfTheDay.findOneAndDelete({});
    // Mark the current word as used.
    if (currentWordOfTheDay) {
      await Words.updateOne(
        { word: currentWordOfTheDay.word },
        { $set: { used: true } }
      );
    }
    const newWord = await Words.findOne({ used: false });
    await WordOfTheDay.create({
      word: newWord.word,
      expirationTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });
  } catch (error) {
    console.error('Error updating word:', error);
  }
}

cron.schedule(
  '0 0 * * *',
  async () => {
    await updateWord();
  },
  { timezone: 'UTC' }
);

// route handlers
app.use('/api/words', wordRouter);

// catch-all error handler
app.get('*', (req, res) => {
  return res.status(404).send("This is not the page you're looking for...");
});

// Global error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
