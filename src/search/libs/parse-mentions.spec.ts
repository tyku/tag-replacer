import { splitMention } from './parse-mentions';

describe('Split mention tests', () => {
  it('Should return tag, id, userValue', () => {
    expect(splitMention('@user-123(qwe)')).toStrictEqual([
      'user',
      '123',
      'qwe',
    ]);
  });

  it('Should return tag, id', () => {
    expect(splitMention('@user-123')).toStrictEqual([
      'user',
      '123',
      undefined,
    ]);
  });

  it('Should return tag, id', () => {
    expect(splitMention('#tag-123')).toStrictEqual([
      'tag',
      '123',
      undefined,
    ]);
  });

  it('Should return undefined, undefined undefined', () => {
    expect(splitMention('#asd')).toStrictEqual([]);
  });
});
