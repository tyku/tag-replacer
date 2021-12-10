const TEXT = '@user-123';

/**
 * @see https://www.youtube.com/watch?v=GTJr8OvyEVQ
 * @param {string} word
 * @return {number[]}
 */
function buildPatternTable(word) {
  const patternTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < word.length) {
    if (word[prefixIndex] === word[suffixIndex]) {
      patternTable[suffixIndex] = prefixIndex + 1;
      suffixIndex += 1;
      prefixIndex += 1;
    } else if (prefixIndex === 0) {
      patternTable[suffixIndex] = 0;
      suffixIndex += 1;
    } else {
      prefixIndex = patternTable[prefixIndex - 1];
    }
  }

  return patternTable;
}

function hasPatternOverlap(letter, pattern) {
  switch (pattern) {
    case '*': {
      return Number.isInteger(Number(letter));
    }
  }
}

/**
 * @param {string} text
 * @param {string} word
 * @return {number[]}
 */
function knuthMorrisPratt(text, word) {
  if (word.length === 0) {
    return 0;
  }

  let textIndex = 0;
  let wordIndex = 0;

  const patternTable = buildPatternTable(word);
  const result = [];

  const possibleResults = [];

  while (textIndex < text.length) {
    if (
      text[textIndex] === word[wordIndex] ||
      hasPatternOverlap(text[textIndex], word[wordIndex])
    ) {
      // We've found a match.
      if (wordIndex === word.length - 1) {
        // result.push(textIndex - word.length + 1);
        result.push(possibleResults.join(''));
      }

      if (word[wordIndex] !== '*') {
        wordIndex += 1;
      }

      textIndex += 1;
    } else if (wordIndex > 0) {
      wordIndex = patternTable[wordIndex - 1];
    } else {
      wordIndex = 0;
      textIndex += 1;
    }
  }

  return result;
}

console.log(knuthMorrisPratt(TEXT, '@user-123'));
// knuthMorrisPratt(TEXT, '@user-*');


