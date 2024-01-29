import mongoose from 'mongoose';
// import cron from 'node-cron';
import 'dotenv/config';

// eslint-disable-next-line no-undef
const MONGO_URI = process.env.VITE_MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Wordle',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const wordsSchema = new Schema({
  word: { type: String, required: true },
  used: Boolean,
});

const Words = mongoose.model('Words', wordsSchema);

const wordOfTheDaySchema = new Schema({
  word: { type: String, required: true },
  expirationTime: Date,
});

const WordOfTheDay = mongoose.model('WordOfTheDay', wordOfTheDaySchema);

export { Words, WordOfTheDay };
