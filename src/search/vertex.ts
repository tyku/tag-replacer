export class Vertex {
  to: Map<number, Vertex>;

  link: Vertex;

  go: Map<number, Vertex>;

  isTerminal = false;

  constructor(public pch: number, public p: Vertex) {
    this.to = new Map();
    this.go = new Map();
  }

  hasTo(code: number): boolean {
    const { to } = this;

    return to.has(code);
  }

  getTo(code: number): Vertex {
    const { to } = this;

    return to.get(code);
  }

  setTo(code: number, vertex: Vertex): void {
    const { to } = this;

    to.set(code, vertex);
  }

  hasGo(code: number): boolean {
    const { go } = this;

    return go.has(code);
  }

  getGo(code: number): Vertex {
    const { go } = this;

    return go.get(code);
  }

  setGo(code: number, vertex: Vertex): void {
    const { go } = this;

    go.set(code, vertex);
  }
}
