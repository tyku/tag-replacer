import { Vertex } from './vertex';

describe('Vetex tests', () => {
  let vertexInstance = null;

  beforeEach(async () => {
    vertexInstance = new Vertex();
  });

  describe('Vertex has operations', () => {
    it('"has" should return false', () => {
      const aCode = 'a'.charCodeAt(0);

      expect(vertexInstance.has(aCode)).toBe(false);
    });

    it('"has" should return true', () => {
      const aCode = 'a'.charCodeAt(0);
      vertexInstance.set(aCode, new Vertex());

      expect(vertexInstance.has(aCode)).toBe(true);
    });
  });

  describe('Vertex get operations', () => {
    it('"get" should return undefined', () => {
      const bCode = 'b'.charCodeAt(0);

      expect(vertexInstance.get(bCode)).toBe(undefined);
    });

    it('"get" should return value', () => {
      const bCode = 'b'.charCodeAt(0);
      vertexInstance.set(bCode, new Vertex());

      expect(vertexInstance.get(bCode)).toBeInstanceOf(Vertex);
    });
  });
});
