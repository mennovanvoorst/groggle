// http://en.wikipedia.org/wiki/Letter_frequency
export const LETTER_FREQUENCIES = [
  8167, 9659, 12441, 16694, 29396, 31624, 33639, 39733, 46699, 46852, 47624,
  51649, 54055, 60804, 68311, 70240, 70335, 76322, 82649, 91705, 94463, 95441,
  97801, 97951, 99925, 100000,
]; // A = 8167, B = 9659, etc.

export const BOARD_SIZE = 4;

export const MAX_WORD_SIZE = 17;
export const MIN_WORD_SIZE = 3;

export const WORD_SCORES: { [key: number]: number } = {
  5: 2,
  6: 3,
  7: 5,
  8: 11,
}; // length: score
