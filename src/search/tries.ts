import { Vertex } from './vertex';

export class Tries {
  private root = new Vertex();

  addWord(s: string) {
    const { root } = this;
    let localVertex = root;

    for (const char of s) {
      const code = Tries.getCode(char);

      if (!localVertex.has(code)) {
        localVertex.set(code, new Vertex());
      }

      localVertex = localVertex.get(code);
      localVertex.markTerminal();
    }

    return this;
  }

  find(s: string) {
    const { root } = this;
    let localRoot = root;

    for (const char of s) {
      const code = Tries.getCode(char);

      if (!localRoot.has(code)) {
        return false;
      }

      localRoot = localRoot.get(code);

      return localRoot.isTerminal();
    }
  }

  static getCode(char: string): number {
    const FIRST_LETTER = 'a';

    return char.charCodeAt(0) - FIRST_LETTER.charCodeAt(0);
  }
}
