import { Tries } from './tries';

describe('Tries tests', () => {
  let triesInstance = null;

  beforeEach(async () => {
    triesInstance = new Tries();
    triesInstance
      .addWord('@user-n')
      .addWord('#tag-n')
      .addWord('abc')
      .addWord('bcdc')
      .addWord('cccb')
      .addWord('bcdd')
      .addWord('bbbc');
  });

  describe('Get code', () => {
    it('should return char code', () => {
      expect(Tries.getCode('a')).toBe(0);
      expect(Tries.getCode('b')).toBe(1);
      expect(Tries.getCode('c')).toBe(2);
    });
  });

  describe('Find added word in trie', () => {
    it('should return false', () => {
      expect(triesInstance.findInTrie('test')).toBe(false);
    });

    it('should return true', () => {
      expect(triesInstance.findInTrie('abc')).toBe(true);
      expect(triesInstance.findInTrie('bcdd')).toBe(true);
    });
  });

  describe('Find word in text', () => {
    it('should return array of founded words', () => {
      const returned = triesInstance.findNew('abcdcbcddbbbcccbbbcccbb');
      const expected = ['abc', 'bcdc', 'bcdd', 'bbbc', 'cccb', 'bbbc', 'cccb'];
      expect(returned).toStrictEqual(expected);
    });

    it('should return empty array', () => {
      const returned = triesInstance.findNew('test');
      const expected = [];
      expect(returned).toStrictEqual(expected);
    });

    it('should return array this tags and mentions', () => {
      const returned = triesInstance.findNew(
        'asded @user-N asdjhu @user-N #tag-N asdkjasdl #tag-N',
      );

      const expected = ['@user-n', '@user-n', '#tag-n', '#tag-n'];

      expect(returned).toStrictEqual(expected);
    });
  });
});
