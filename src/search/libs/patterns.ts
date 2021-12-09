import {
  NUMBER_PATTERN,
  LETTER_PATTERN,
  FIRST_NUMBER_LETTER,
  LAST_NUMBER_LETTER,
} from '../constants';
import { getCode, getLetterByCode } from './codes';

export const exePattern = (char): number | undefined => {
  return char >= getCode(FIRST_NUMBER_LETTER) &&
    char <= getCode(LAST_NUMBER_LETTER)
    ? getCode(NUMBER_PATTERN)
    : undefined;
};

export const letterPattern = (char: number): number | undefined => {
  const letter = getLetterByCode(char);
  return /[a-zа-я]/.test(letter) ? getCode(LETTER_PATTERN) : undefined;
};

export const getPattern = (pattern) => {
  switch (pattern) {
    case NUMBER_PATTERN:
      return exePattern;
    case LETTER_PATTERN:
      return letterPattern;
  }
};
