import { Vertex } from './vertex';
import { FIRST_LETTER } from './constants';

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
        if (char === '*') {
          vertex.isPattern = true;
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

      if (prevVertex.isTerminal && u === this.root) {
        let l = prevVertex;
        console.log('-------------', prevVertex.originalSymb);
        while (l.pch >= 0) {
          const letter = l.isPattern
            ? l.originalSymb
            : Tries.getLetterByCode(l.pch);
          foundString = letter + foundString;
          l = l.p;
        }
        result.push(foundString);
        foundString = '';
        prevVertex.reset();
      }

      prevVertex = u;
    }

    return result;
  }

  go(v: Vertex, code: number): Vertex {
    const numberCode = Number(Tries.getLetterByCode(code));
    const isNumber = !!numberCode && Number.isInteger(numberCode);
    const originLetter = Tries.getLetterByCode(code);

    if (isNumber) {
      code = Tries.getCode('*');
    }

    if (!v.hasGo(code)) {
      if (v.getTo(code)) {
        v.setGo(code, v.getTo(code));
      } else if (v === this.root) {
        v.setGo(code, this.root);
      } else {
        v.setGo(code, this.go(this.link(v), code));
      }
    }

    const u = v.getGo(code);
    if (isNumber) {
      u.originalSymb += originLetter;
    }
    return u;
  }

  private link(v: Vertex): Vertex {
    if (!v.link) {
      if (v === this.root || v.p === this.root) {
        v.link = this.root;
      } else if (v.isPattern) {
        v.link = v.p;
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
