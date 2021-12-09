import { Inject, Injectable } from '@nestjs/common';

import { SEARCH_PROVIDER_TOKEN } from './search/constants';
import { Tries } from './search/tries';
import { text } from './texts/brad_pitt.json';

@Injectable()
export class AppService {
  constructor(
    @Inject(SEARCH_PROVIDER_TOKEN)
    private readonly searchProvider: Tries,
  ) {}

  run(): string[] {
    return this.searchProvider.findNew(text);
  }
}
