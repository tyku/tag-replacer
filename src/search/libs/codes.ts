import { FIRST_LETTER, SALT_CODE } from '../constants';

export function getCode(char: string): number {
  return char.charCodeAt(0) - FIRST_LETTER.charCodeAt(0) + SALT_CODE;
}

export function getLetterByCode(code: number): string {
  return String.fromCharCode(FIRST_LETTER.charCodeAt(0) + code - SALT_CODE);
}
