import { CellData } from '@/components/Cell';
import {
  BOARD_SIZE,
  LETTER_FREQUENCIES,
  MAX_WORD_SIZE,
  MIN_WORD_SIZE,
  WORD_SCORES,
} from '@/constants';
import wordlist from 'an-array-of-english-words';

export const generateRandomLetter = () => {
  const random = Math.random() * 100000; // generate random number with a maximum of the heighest frequency
  let letter = '';

  for (let i = 0; i < LETTER_FREQUENCIES.length; i++) {
    // if the random generated number is lower that this letter's frequency, add it to the grid. Otherwise continue with the loop
    if (random < LETTER_FREQUENCIES[i]) {
      letter = String.fromCharCode(65 + i);
      break;
    }
  }

  return letter;
};

export const getAdjacentCells = (board: string[][], x: number, y: number) => {
  const maxX = board.length - 1;
  const maxY = board[0].length - 1;
  const adjacentCells: number[][] = [];

  // Loop through all neighbouring cells
  // If a cell is on the side, stay within bounds (0), otherwise move one row or column up
  for (let dx = x > 0 ? -1 : 0; dx <= (x < maxX ? 1 : 0); dx++) {
    for (let dy = y > 0 ? -1 : 0; dy <= (y < maxY ? 1 : 0); dy++) {
      if (dx != 0 || dy != 0) adjacentCells.push([x + dx, y + dy]);
    }
  }

  return adjacentCells;
};

export const checkWord = (wordToCheck: string) =>
  wordlist.includes(wordToCheck.toLowerCase());

export const checkSubstring = (wordToCheck: string) =>
  wordlist.find((word) => word.includes(wordToCheck.toLowerCase()));

export const generateBoard = () => {
  const board = [...Array(BOARD_SIZE)].map((_) => Array(BOARD_SIZE));

  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      board[x][y] = generateRandomLetter();
    }
  }

  return board;
};

export const calculateScore = (wordLength: number) => {
  const score = WORD_SCORES[wordLength];

  if (score !== undefined) return score;

  if (wordLength >= 8) return 11;

  return 1;
};

export const formatWord = (cells: CellData[]) =>
  cells.map((cell) => cell.letter).join('');

/// checks if two arrays are exactly the same
// e.g. [1,1] === [1,1], [1,0] !== [1,1]
export const arrayMatch = (arr: number[][], value: number[]) =>
  arr.some((coords: number[]) =>
    value.every((pos: number, index: number) => pos === coords[index]),
  );

export const getNextInArray = <T>(arr: T[], index: number) => {
  if (index >= 0 && index < arr.length - 1) return arr[index + 1];

  return null;
};

export const getPrevInArray = <T>(arr: T[], index: number) => {
  if (index >= 0 && index < arr.length - 1) return arr[index + 1];

  return null;
};

export const calculateLineDirection = (
  from: HTMLDivElement,
  to: HTMLDivElement,
) => {
  const fT = from.offsetTop + from.offsetHeight / 2;
  const tT = to.offsetTop + to.offsetHeight / 2;
  const fL = from.offsetLeft + from.offsetWidth / 2;
  const tL = to.offsetLeft + to.offsetWidth / 2;

  const CA = Math.abs(tT - fT);
  const CO = Math.abs(tL - fL);
  const H = Math.sqrt(CA * CA + CO * CO);
  let ANG = (180 / Math.PI) * Math.acos(CA / H);

  let top, left;

  if (tT > fT) {
    top = (tT - fT) / 2 + fT;
  } else {
    top = (fT - tT) / 2 + tT;
  }
  if (tL > fL) {
    left = (tL - fL) / 2 + fL;
  } else {
    left = (fL - tL) / 2 + tL;
  }

  if (
    (fT < tT && fL < tL) ||
    (tT < fT && tL < fL) ||
    (fT > tT && fL > tL) ||
    (tT > fT && tL > fL)
  ) {
    ANG *= -1;
  }
  top -= H / 4;

  return { ang: ANG, top, left, height: H / 2 };
};
