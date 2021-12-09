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
          const aliases = new Map([
            [Tries.getCode('1'), Tries.getCode('*')],
            [Tries.getCode('2'), Tries.getCode('*')],
            [Tries.getCode('3'), Tries.getCode('*')],
            [Tries.getCode('4'), Tries.getCode('*')],
            [Tries.getCode('5'), Tries.getCode('*')],
            [Tries.getCode('6'), Tries.getCode('*')],
            [Tries.getCode('7'), Tries.getCode('*')],
            [Tries.getCode('8'), Tries.getCode('*')],
            [Tries.getCode('9'), Tries.getCode('*')],
            [Tries.getCode('0'), Tries.getCode('*')],
          ]);
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
      // if (lowCaseStr[i] === '1')
      //   console.log(lowCaseStr[i], Tries.getLetterByCode(948), u);
      // if (lowCaseStr[i] === '2')
      //   console.log(lowCaseStr[i], Tries.getLetterByCode(948), u);
      // if (lowCaseStr[i] === '3')
      //   console.log(lowCaseStr[i], Tries.getLetterByCode(948), u);
      // if (lowCaseStr[i] === 'j')
      //   console.log(lowCaseStr[i], Tries.getLetterByCode(948), u);
      u = this.go(u, Tries.getCode(lowCaseStr[i]));
      // console.log(u.originalSymb);

      if (u.pch >= 0) {
        const letter = u.isPattern
          ? u.originalSymb
          : Tries.getLetterByCode(u.pch);
        foundString += letter;
      }

      if (prevVertex.isTerminal && u === this.root) {
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
        if (u.isPattern) u.originalSymb = Tries.getLetterByCode(code);

        // if(Tries.getLetterByCode(code) === '1') console.log('--------', v.getTo(code))
        // if(Tries.getLetterByCode(code) === '2') console.log('--------', v.getTo(code))
        // if(Tries.getLetterByCode(code) === '3') console.log('--------', v.getTo(code))
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
