import Board from './Board';
import Keyboard from './Keyboard';
import { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface GameContextProps {
  numberOfGuesses: number;
  setNumberOfGuesses: React.Dispatch<React.SetStateAction<number>>;
  wordAttempts: string[][];
  setWordAttempts: React.Dispatch<React.SetStateAction<string[][]>>;
  showConfetti: boolean;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [incorrectlyPlacedLetters, setIncorrectlyPlacedLetters] = useState<
    string[]
  >([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [currentColIndex, setCurrentColIndex] = useState<number>(0);
  const [wordOfTheDay, setWordOfTheDay] = useState<string>('');

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
        showConfetti,
        setShowConfetti,
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
      }}
    >
      <div className='mt-20 text-xs md:text-base '>
        <Board />
        <Keyboard />
      </div>
    </GameContext.Provider>
  );
}

export default Game;
