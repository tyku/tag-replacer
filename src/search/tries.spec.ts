import { Tries } from './tries';

describe('Tries tests', () => {
  let triesInstance = null;

  beforeEach(async () => {
    triesInstance = new Tries();
    triesInstance.addWord('Frodo').addWord('Gandalf').addWord('Sauron');
  });

  describe('Get code', () => {
    it('should return char code', () => {
      expect(Tries.getCode('a')).toBe(0);
      expect(Tries.getCode('b')).toBe(1);
      expect(Tries.getCode('c')).toBe(2);
    });
  });

  describe('Find word', () => {
    it('should return false', () => {
      expect(triesInstance.find('test')).toBe(false);
    });

    it('should return true', () => {
      expect(triesInstance.find('Frodo')).toBe(true);
    });
  });
});
