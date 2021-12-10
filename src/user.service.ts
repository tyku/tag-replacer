import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  getMentions(ids: number[]) {
    return this.userRepo
      .createQueryBuilder()
      .select(['id, lastname, firstname, email'])
      .where(`id::integer IN (${ids})`)
      .execute();
  }
}
