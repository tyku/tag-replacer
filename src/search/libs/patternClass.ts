import { getCode, getLetterByCode } from './codes';

export class Mask {
  constructor(
    private readonly symbol: string,
    private readonly regexp: RegExp,
  ) {}

  getMask(): (code: number) => number | undefined {
    const { regexp } = this;
    const symbolCode = this.getSymbolCode();

    return function (code) {
      const letter = getLetterByCode(code);

      return regexp.test(letter) ? symbolCode : undefined;
    };
  }

  getSymbolCode() {
    return getCode(this.symbol);
  }

  getSymbol() {
    return this.symbol;
  }
}
