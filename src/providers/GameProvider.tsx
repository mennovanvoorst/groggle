import { CellData } from '@/components/Cell';
import { MessageType } from '@/components/Message';
import { MIN_WORD_SIZE } from '@/constants';
import { useMousePressed } from '@/hooks';
import { useMessage } from '@/hooks/useMessage';
import {
  calculateScore,
  checkWord,
  formatWord,
  generateBoard,
  getAdjacentCells,
} from '@/utils';
import React, { createContext, useContext, useEffect, useState } from 'react';

type GameContextState = {
  board: string[][];
  selectedCells: CellData[];
  guessedWords: { [word: string]: boolean };
  score: number;
  message: MessageType | null;
  cellClicked: (cell: CellData) => void;
  cellEntered: (cell: CellData) => void;
  setBoard: (board: string[][]) => void;
  reset: () => void;
};

export const initialGameContext = {
  board: [],
  selectedCells: [],
  guessedWords: {},
  score: 0,
  message: null,
  cellClicked: () => null,
  cellEntered: () => null,
  setBoard: () => null,
  reset: () => null,
};

export const GameContext = createContext<GameContextState>(initialGameContext);

type GameProviderProps = {
  children: React.ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [board, setBoard] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<CellData[]>([]);
  const [guessedWords, setGuessedWords] = useState<{ [word: string]: boolean }>(
    {},
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useMessage();

  const mousePressed = useMousePressed();

  useEffect(() => {
    if (selectedCells.length === 0 || mousePressed) return;

    submitWord();
    setSelectedCells([]);
    setIsDragging(false);
  }, [mousePressed]);

  const cellClicked = (cell: CellData) => {
    setIsDragging(true);
    setSelectedCells([...selectedCells, cell]);
  };

  const cellEntered = (cell: CellData) => {
    if (!isDragging) return;
    const lastCell = selectedCells[selectedCells.length - 1];
    const isLastCell = lastCell.x === cell.x && lastCell.y === cell.y;

    if (cell.selected) {
      if (!isLastCell) {
        setSelectedCells((cells) =>
          cells.filter((c) => lastCell.x !== c.x || lastCell.y !== c.y),
        );
      }

      return;
    }

    if (
      lastCell &&
      getAdjacentCells(board, cell.x, cell.y).some(
        (adjacentCell) =>
          adjacentCell[0] === lastCell.x && adjacentCell[1] === lastCell.y,
      )
    ) {
      setSelectedCells([...selectedCells, cell]);
    }
  };

  const addScore = (scoreToAdd: number) => setScore(score + scoreToAdd);

  const reset = () => {
    setBoard(generateBoard());
    setGuessedWords({});
    setScore(0);
  };

  const submitWord = () => {
    const word = formatWord(selectedCells);

    if (Object.keys(guessedWords).includes(word)) {
      return setMessage({
        state: 'error',
        message: 'Already guessed',
      });
    }

    if (selectedCells.length < MIN_WORD_SIZE) {
      return setMessage({
        state: 'error',
        message: 'Not long enough',
      });
    }

    if (checkWord(word)) {
      const score = calculateScore(word.length);
      addScore(score);
      setGuessedWords({ ...guessedWords, [word]: true });

      setMessage({
        state: 'success',
        message: `+${score} points`,
      });
    } else {
      setGuessedWords({ ...guessedWords, [word]: false });
      setMessage({
        state: 'error',
        message: 'Invalid word',
      });
    }
  };

  return (
    <GameContext.Provider
      value={{
        board,
        selectedCells,
        score,
        message,
        guessedWords,
        cellClicked,
        cellEntered,
        setBoard,
        reset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error('Cannot be used outside GameProvider');
  }
  return context;
};

export { GameProvider, useGame };
