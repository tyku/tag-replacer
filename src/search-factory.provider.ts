import { FactoryProvider } from '@nestjs/common';

import { SEARCH_PROVIDER_TOKEN } from './search/constants';
import { Tries } from './search/tries';

export const searchProvider = (patterns: string[] = []): FactoryProvider => ({
  provide: SEARCH_PROVIDER_TOKEN,
  useFactory: () => {
    const searchInstance = new Tries();
    patterns.forEach((pattern) => searchInstance.addWord(pattern));

    return searchInstance;
  },
});
