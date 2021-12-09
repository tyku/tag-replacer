import {
  NUMBER_PATTERN,
  LETTER_PATTERN,
  FIRST_NUMBER_LETTER,
  LAST_NUMBER_LETTER,
} from '../constants';
import { Tries } from '../tries';

export const exePattern = (char): number | undefined => {
  return char >= Tries.getCode(FIRST_NUMBER_LETTER) &&
    char <= Tries.getCode(LAST_NUMBER_LETTER)
    ? Tries.getCode(NUMBER_PATTERN)
    : undefined;
};

export const letterPattern = (char: number): number | undefined => {
  const letter = Tries.getLetterByCode(char);
  return /[a-zа-я]/.test(letter) ? Tries.getCode(LETTER_PATTERN) : undefined;
};

export const getPattern = (pattern) => {
  switch (pattern) {
    case NUMBER_PATTERN:
      return exePattern;
    case LETTER_PATTERN:
      return letterPattern;
  }
};
