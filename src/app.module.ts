import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TAG_PATTERN, USER_PATTERN } from './search/constants';
import { searchProvider } from './search-factory.provider';
import { common, database } from './config';
import entities from './entities';
import { UserService } from './user.service';
import { TagService } from './tag.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, common],
    }),
    TypeOrmModule.forFeature(entities),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<Record<string, any>>('database'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    TagService,
    searchProvider([TAG_PATTERN, USER_PATTERN]),
  ],
})
export class AppModule {}
