import { FactoryProvider } from '@nestjs/common';

import {
  LETTER_PATTERN,
  NUMBER_PATTERN,
  SEARCH_PROVIDER_TOKEN,
} from './search/constants';
import { Tries } from './search/tries';
import { Mask } from './search/libs/patternClass';

export const searchProvider = (patterns: string[] = []): FactoryProvider => ({
  provide: SEARCH_PROVIDER_TOKEN,
  useFactory: () => {
    const searchInstance = new Tries();
    searchInstance
      .addMaskRule(new Mask(NUMBER_PATTERN, /[0-9]/))
      .addMaskRule(new Mask(LETTER_PATTERN, /[a-zа-я]/));

    patterns.forEach((pattern) => searchInstance.addWord(pattern));

    return searchInstance;
  },
});
