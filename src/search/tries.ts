import { Vertex } from './vertex';
import { DEFAULT_CHAR, DEFAULT_POINTER } from './constants';

import { getCode, getLetterByCode } from './libs';
import { Mask } from './libs/patternClass';

export class Tries {
  private root = new Vertex(DEFAULT_CHAR, DEFAULT_POINTER);

  private maskMap: Map<number, (char: number) => number | undefined> =
    new Map();

  addMaskRule(mask: Mask) {
    this.maskMap.set(mask.getSymbolCode(), mask.getMask());

    return this;
  }

  addWord(s: string) {
    const { root, maskMap } = this;
    let localVertex = root;
    const lowCaseStr = s.toLowerCase();

    for (const char of lowCaseStr) {
      const code = getCode(char);

      if (!localVertex.hasTo(code)) {
        const vertex = new Vertex(code, localVertex);

        if (maskMap.has(code)) {
          vertex.isPattern = true;
          const aliases = maskMap.get(code);

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

  patternExist(s: string) {
    const { root } = this;
    let localRoot = root;

    const lowCaseStr = s.toLowerCase();

    for (const char of lowCaseStr) {
      const code = getCode(char);

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
    const tmpFoundString = [];
    for (let i = 0; i < lowCaseStr.length; i++) {
      u = this.go(u, getCode(lowCaseStr[i]));

      if (u.p === this.root || u === this.root) {
        if (tmpFoundString.length) {
          result.push(tmpFoundString[tmpFoundString.length - 1]);
          tmpFoundString.length = 0;
        }

        foundString = '';
      }

      if (u.pch >= 0) {
        const letter = u.isPattern ? lowCaseStr[i] : getLetterByCode(u.pch);
        foundString += letter;
      }

      if (u.isTerminal) {
        tmpFoundString.push(foundString);
      }

      prevVertex = u;
    }

    if (tmpFoundString.length) {
      result.push(tmpFoundString[tmpFoundString.length - 1]);
    }

    return result;
  }

  private go(v: Vertex, code: number): Vertex {
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
}
