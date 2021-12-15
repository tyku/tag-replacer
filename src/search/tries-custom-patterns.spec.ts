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
      .addWord('@entity-*')
      .addWord('@entity-* (sadd)')
      .addWord('#tag-*');
  });

  describe('Find word in text', () => {
    it('should return empty array', () => {
      const returned = triesInstance.findNew('test');
      const expected = [];
      expect(returned).toStrictEqual(expected);
    });

    it('should return array with one mention', () => {
      const returned = triesInstance.findNew('@entity-333asdasd');

      expect(returned).toStrictEqual(['@entity-333']);
    });

    it('should return array with one tag', () => {
      const returned = triesInstance.findNew('ads #tag-123');

      expect(returned).toStrictEqual(['#tag-123']);
    });

    it('should return array with one mention', () => {
      const returned = triesInstance.findNew('ads @entity-123 (sa');

      expect(returned).toStrictEqual(['@entity-123']);
    });

    it('should return array with tags and mentions', () => {
      const returned = triesInstance.findNew(
        '@entity-333asdasd @entity-444 sad#tag-123asd sadasdas (sadd) adasdasd@entity-666 (sadd)asdasd @entity-888 @entity999asdasd@entity-999 (sad',
      );

      expect(returned).toStrictEqual([
        '@entity-333',
        '@entity-444',
        '#tag-123',
        '@entity-666 (sadd)',
        '@entity-888',
        '@entity-999',
      ]);
    });
  });
});
