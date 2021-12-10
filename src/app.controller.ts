import { ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { TResultMentionsData } from './types';

@Controller('/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: 'Found tags and mentions',
  })
  @Get('/search/mentions')
  mentions(): string[] {
    return this.appService.mentions();
  }

  @ApiResponse({
    status: 200,
    description: 'Found tags and mentions matched with data',
  })
  @Get('/search/mentions/data')
  mentionData(): Promise<TResultMentionsData> {
    return this.appService.mentionData();
  }
}
