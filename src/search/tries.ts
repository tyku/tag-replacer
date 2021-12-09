import { Vertex } from './vertex';
import { FIRST_LETTER } from './constants';

const exePattern = (char): number | undefined => {
  return char >= Tries.getCode('0') && char <= Tries.getCode('9')
    ? Tries.getCode('*')
    : undefined;
};

const letterPattern = (char: number): number | undefined => {
  const letter = Tries.getLetterByCode(char);
  return /[a-zа-я]/.test(letter) ? Tries.getCode('?') : undefined;
};

const getPattern = (pattern) => {
  switch (pattern) {
    case '*':
      return exePattern;
    case '?':
      return letterPattern;
  }
};

export class Tries {
  private root = new Vertex(-1, undefined);

  addWord(s: string) {
    const { root } = this;
    let localVertex = root;
    const lowCaseStr = s.toLowerCase();

    for (const char of lowCaseStr) {
      const code = Tries.getCode(char);

      if (!localVertex.hasTo(code)) {
        const vertex = new Vertex(code, localVertex);
        if (['*', '?'].includes(char)) {
          vertex.isPattern = true;
          const aliases = getPattern(char);
          localVertex.patternMap = aliases;
          vertex.patternMap = aliases;

          vertex.setTo(code, vertex);
        }

        localVertex.setTo(code, vertex);
      }

      localVertex = localVertex.getTo(code);
    }

    localVertex.isTerminal = true;

    return this;
  }

  findInTrie(s: string) {
    const { root } = this;
    let localRoot = root;

    const lowCaseStr = s.toLowerCase();

    for (const char of lowCaseStr) {
      const code = Tries.getCode(char);

      if (!localRoot.hasTo(code)) {
        return false;
      }

      localRoot = localRoot.getTo(code);
    }
    return localRoot.isTerminal;
  }

  findNew(s: string) {
    const lowCaseStr = s.toLowerCase();

    let u: Vertex = this.root;
    let foundString = '';
    const result = [];
    let prevVertex = u;

    for (let i = 0; i < lowCaseStr.length; i++) {
      u = this.go(u, Tries.getCode(lowCaseStr[i]));

      if (prevVertex.hasGo(u.pch) || prevVertex.hasTo(u.pch)) {
        const letter = u.isPattern
          ? u.originalSymb
          : Tries.getLetterByCode(u.pch);
        foundString += letter;
      } else if (foundString) {
        result.push(foundString);
        foundString = '';
      }
      prevVertex = u;
    }

    return result;
  }

  go(v: Vertex, code: number): Vertex {
    if (!v.hasGo(code)) {
      if (v.getTo(code)) {
        const u = v.getTo(code);
        if (u.isPattern) {
          u.originalSymb = Tries.getLetterByCode(code);
        }
        v.setGo(code, u);
      } else if (v === this.root) {
        v.setGo(code, this.root);
      } else {
        v.setGo(code, this.go(this.link(v), code));
      }
    }

    return v.getGo(code);
  }

  private link(v: Vertex): Vertex {
    if (!v.link) {
      if (v === this.root || v.p === this.root) {
        v.link = this.root;
      } else {
        v.link = this.go(this.link(v.p), v.pch);
      }
    }

    return v.link;
  }

  static getCode(char: string): number {
    return char.charCodeAt(0) - FIRST_LETTER.charCodeAt(0) + 1000;
  }

  static getLetterByCode(code: number): string {
    return String.fromCharCode(FIRST_LETTER.charCodeAt(0) + code - 1000);
  }
}
