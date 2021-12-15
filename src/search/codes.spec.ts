import { getCode } from './libs';

describe('Tries tests', () => {
  describe('Get code', () => {
    it('should return char code', () => {
      expect(getCode('a')).toBe(1000);
      expect(getCode('b')).toBe(1001);
      expect(getCode('c')).toBe(1002);
    });
  });
});
