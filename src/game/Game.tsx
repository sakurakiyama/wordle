import Board from './Board';
import Keyboard from './Keyboard';
import { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface GameContextProps {
  numberOfGuesses: number;
  setNumberOfGuesses: React.Dispatch<React.SetStateAction<number>>;
  wordAttempts: string[][];
  setWordAttempts: React.Dispatch<React.SetStateAction<string[][]>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  incorrectLetters: string[];
  setIncorrectLetters: React.Dispatch<React.SetStateAction<string[]>>;
  incorrectlyPlacedLetters: string[];
  setIncorrectlyPlacedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  correctLetters: string[];
  setCorrectLetters: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  currentRowIndex: number;
  setCurrentRowIndex: React.Dispatch<React.SetStateAction<number>>;
  currentColIndex: number;
  setCurrentColIndex: React.Dispatch<React.SetStateAction<number>>;
  rowRefs: React.MutableRefObject<HTMLDivElement | null>[];
  wordOfTheDay: string;
  setGuessedCorrectly: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameContext = createContext<GameContextProps | null>(null);

function Game() {
  const [wordAttempts, setWordAttempts] = useState<string[][]>([
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ]);
  const [numberOfGuesses, setNumberOfGuesses] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [incorrectlyPlacedLetters, setIncorrectlyPlacedLetters] = useState<
    string[]
  >([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [currentColIndex, setCurrentColIndex] = useState<number>(0);
  const [wordOfTheDay, setWordOfTheDay] = useState<string>('');
  const [guessedCorrectly, setGuessedCorrectly] = useState<boolean>(false);
  const [definition, setDefinition] = useState<string>('');

  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(48).fill(null)
  );

  const rowRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const getWordOfTheDay = async () => {
      const { data } = await axios.get('/api/words/getWordOfTheDay');
      setWordOfTheDay(data.word.toUpperCase());
      const { data: wordData } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`
      );
      setDefinition(wordData[0].meanings[0].definitions[0].definition);
    };
    getWordOfTheDay();
  }, []);

  return (
    <GameContext.Provider
      value={{
        numberOfGuesses,
        setNumberOfGuesses,
        wordAttempts,
        setWordAttempts,
        showModal,
        setShowModal,
        incorrectLetters,
        setIncorrectLetters,
        incorrectlyPlacedLetters,
        setIncorrectlyPlacedLetters,
        correctLetters,
        setCorrectLetters,
        inputRefs,
        currentColIndex,
        setCurrentColIndex,
        currentRowIndex,
        setCurrentRowIndex,
        rowRefs,
        wordOfTheDay,
        setGuessedCorrectly,
      }}
    >
      <div className='mt-20 text-xs md:text-base'>
        {showModal && (
          <div className='top-0 bottom-0 left-0 right-0 fixed bg-[#010502A2] flex justify-center items-center'>
            <div className='z-1 bg-white max-w-96 md:max-w-lg w-fit h-fit rounded-md shadow-sm flex flex-col items-center justify-center space-y-8 border-2 border-[var(--hot-pink)] relative p-6'>
              <button
                className='absolute top-0 right-0 m-2'
                onClick={() => setShowModal(false)}
              >
                <IoCloseCircleOutline size={20} />
              </button>
              <div>
                {guessedCorrectly && (
                  <p className='pb-4'>
                    Nice work! You guessed the word in {numberOfGuesses + 1}{' '}
                    attempt(s). The word is:
                  </p>
                )}
                {!guessedCorrectly && (
                  <p className='pb-4'>
                    You weren't able to guess the word today. That's okay! The
                    word is:
                  </p>
                )}
                <div className='text-center pb-4'>
                  <p className='text-xl font-semibold'>{wordOfTheDay}</p>
                </div>
                <p>Definition: {definition}</p>
              </div>
            </div>
          </div>
        )}
        <Board />
        <Keyboard />
      </div>
    </GameContext.Provider>
  );
}

export default Game;
