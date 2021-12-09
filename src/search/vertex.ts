export class Vertex {
  to: Map<number, Vertex>;

  link: Vertex;

  go: Map<number, Vertex>;

  isTerminal = false;

  isPattern = false;

  patternMap: Map<number, number>;

  originalSymb = '';

  constructor(public pch: number, public p: Vertex) {
    this.to = new Map();
    this.go = new Map();
  }

  reset() {
    this.originalSymb = '';
    this.link = undefined;
    this.go = new Map();
  }

  hasTo(code: number): boolean {
    const { to } = this;

    return to.has(code);
  }

  getTo(code: number): Vertex {
    const { to } = this;

    if (to.has(code)) {
      return to.get(code);
    }

    if (!this.patternMap) {
      return;
    }

    const key = this.patternMap.get(code);

    return to.get(key);
  }

  setTo(code: number, vertex: Vertex): void {
    const { to } = this;

    to.set(code, vertex);
  }

  hasGo(code: number): boolean {
    const { go } = this;
    if (!this.patternMap) {
      return go.has(code);
    }

    const key = this.patternMap.get(code);

    return go.has(key);
  }

  getGo(code: number): Vertex {
    const { go } = this;
    if (go.has(code)) {
      return go.get(code);
    }

    if (!this.patternMap) {
      return;
    }

    const key = this.patternMap.get(code);
    return go.get(key);
  }

  setGo(code: number, vertex: Vertex): void {
    const { go } = this;

    go.set(code, vertex);
  }
}
