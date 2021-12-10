import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepo: Repository<TagEntity>,
  ) {}

  getMentions(ids: number[]) {
    return this.tagRepo
      .createQueryBuilder()
      .select(['id tag'])
      .where(`id::integer IN (${ids})`)
      .execute();
  }
}
