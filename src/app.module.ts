import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TAG_PATTERN, USER_PATTERN } from './search/constants';
import { searchProvider } from './search-factory.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, searchProvider([TAG_PATTERN, USER_PATTERN])],
})
export class AppModule {}
