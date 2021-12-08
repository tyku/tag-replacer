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
        localVertex.setTo(code, new Vertex(code, localVertex));
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

    for (let i = 0; i < lowCaseStr.length; i++) {
      u = this.go(u, Tries.getCode(lowCaseStr[i]));

      if (u.isTerminal) {
        let l = u;

        while (l.pch >= 0) {
          foundString = Tries.getLetterByCode(l.pch) + foundString;
          l = l.p;
        }

        result.push(foundString);
        foundString = '';
      }
    }

    return result;
  }

  go(v: Vertex, code: number): Vertex {
    if (!v.hasGo(code)) {
      if (v.getTo(code)) {
        v.setGo(code, v.getTo(code));
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
    return char.charCodeAt(0) - FIRST_LETTER.charCodeAt(0);
  }

  static getLetterByCode(code: number): string {
    return String.fromCharCode(FIRST_LETTER.charCodeAt(0) + code);
  }
}
