export class Vertex {
  private to: Map<number, Vertex> = new Map();

  private terminal = false;

  has(code: number): boolean {
    const { to } = this;

    return to.has(code);
  }

  get(code: number): Vertex {
    const { to } = this;

    return to.get(code);
  }

  set(code: number, vertex: Vertex): void {
    const { to } = this;

    to.set(code, vertex);
  }

  markTerminal() {
    this.terminal = true;
  }

  isTerminal(): boolean {
    const { terminal } = this;

    return terminal;
  }
}
