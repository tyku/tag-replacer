import { Tries } from './tries';
import { Mask } from './libs/patternClass';
import { LETTER_PATTERN, NUMBER_PATTERN } from './constants';

describe('Tries tests with default pattern symbols(*, ?)', () => {
  let triesInstance = null;

  beforeEach(async () => {
    triesInstance = new Tries();
    triesInstance
      .addMaskRule(new Mask(NUMBER_PATTERN, /[0-9]/))
      .addMaskRule(new Mask(LETTER_PATTERN, /[а-яa-z]/))
      .addWord('#tag-*')
      .addWord('@user-*(?)');
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
      ]);
    });
  });
});
