import { Vertex } from './vertex';

describe('Vetex tests', () => {
  let vertexInstance = null;

  beforeEach(async () => {
    vertexInstance = new Vertex(-1, undefined);
  });

  describe('Vertex has operations', () => {
    it('"has" should return false', () => {
      const aCode = 'a'.charCodeAt(0);

      expect(vertexInstance.hasTo(aCode)).toBe(false);
    });

    it('"has" should return true', () => {
      const aCode = 'a'.charCodeAt(0);

      vertexInstance.setTo(aCode, undefined);

      expect(vertexInstance.hasTo(aCode)).toBe(true);
    });
  });

  describe('Vertex get operations', () => {
    it('"get" should return undefined', () => {
      const bCode = 'b'.charCodeAt(0);

      expect(vertexInstance.getTo(bCode)).toBe(undefined);
    });

    it('"get" should return value', () => {
      const bCode = 'b'.charCodeAt(0);
      const cCode = 'c'.charCodeAt(0);
      vertexInstance.setTo(bCode, new Vertex(cCode, undefined));

      expect(vertexInstance.getTo(bCode)).toBeInstanceOf(Vertex);
    });
  });
});
