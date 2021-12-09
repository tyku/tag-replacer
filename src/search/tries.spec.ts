import { Tries } from './tries';

describe('Tries tests', () => {
  let triesInstance = null;

  beforeEach(async () => {
    triesInstance = new Tries();
    triesInstance.addWord('#tag-*').addWord('@user-*(?)');
  });

  describe('Get code', () => {
    it('should return char code', () => {
      expect(Tries.getCode('a')).toBe(1000);
      expect(Tries.getCode('b')).toBe(1001);
      expect(Tries.getCode('c')).toBe(1002);
    });
  });

  describe('Find added word in trie', () => {
    it('should return false', () => {
      expect(triesInstance.patternExist('test')).toBe(false);
    });

    it('should return true', () => {
      expect(triesInstance.patternExist('@user-*(?)')).toBe(true);
      expect(triesInstance.patternExist('#tag-*')).toBe(true);
    });
  });

  describe('Find word in text', () => {
    it('should return empty array', () => {
      const returned = triesInstance.findNew('test');
      const expected = [];
      expect(returned).toStrictEqual(expected);
    });

    it('should return array this tags and mentions', () => {
      const returned = triesInstance.findNew(
        'asd#tag-434ekd@user-123(ds) js@user-53(dfad)wadssad@user-9892.',
      );

      expect(returned).toStrictEqual([
        '#tag-434',
        '@user-123(ds)',
        '@user-53(dfad)',
        '@user-9892',
      ]);
    });
  });
});
