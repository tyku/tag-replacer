import { Inject, Injectable } from '@nestjs/common';

import { SEARCH_PROVIDER_TOKEN } from './search/constants';
import { Tries } from './search/tries';
import { text } from './texts/brad_pitt.json';
import { UserService } from './user.service';
import { TagService } from './tag.service';
import { TAG_TYPE, USER_TYPE } from './constants';
import { TMention, TResultMentionsData } from './types';
import { splitMention } from './search/libs';

export type TMentionMap = Map<string, TMention[]>;

@Injectable()
export class AppService {
  constructor(
    @Inject(SEARCH_PROVIDER_TOKEN)
    private readonly searchProvider: Tries,
    private readonly userService: UserService,
    private readonly tagService: TagService,
  ) {}

  mentions(): string[] {
    return this.searchProvider.findNew(text);
  }

  mentionData(): Promise<TResultMentionsData> {
    const mentions = this.searchProvider.findNew(text);
    const parsedMentions = this.parseMentions(mentions);

    return this.buildResponse(parsedMentions);
  }

  private parseMentions(rawMentions: string[] = []): TMentionMap {
    // @todo This regexp works everywhere, except conde inside docker oO
    // const tagRegexp = new RegExp(
    //   `(${USER_TYPE}|${TAG_TYPE})-(\d+)\(([a-zа-я]+)?\)`,
    // );

    const map: TMentionMap = new Map([
      [USER_TYPE, []],
      [TAG_TYPE, []],
    ]);

    return rawMentions.reduce((acc, mention) => {
      const [type, entityId, userValue] = splitMention(mention);

      if (!type || !entityId) {
        return acc;
      }

      const data = {
        mention,
        id: Number(entityId),
        userValue,
      };

      acc.get(type).push(data);

      return acc;
    }, map);
  }

  private getUsers(mentions: TMentionMap) {
    const usersIds = mentions.get(USER_TYPE).map(({ id }) => id);

    return this.userService.getMentions(usersIds);
  }

  private getTags(mentions: TMentionMap) {
    const tagsIds = mentions.get(TAG_TYPE).map(({ id }) => id);

    return this.tagService.getMentions(tagsIds);
  }

  private getUserData(data): Record<string, any> {
    const { lastname, firstname, email } = data;

    return {
      lastName: lastname,
      firstName: firstname,
      email,
    };
  }

  private getTagData(data): Record<string, any> {
    const { tag } = data;

    return { tag };
  }

  private mergeMentionWithData(
    type: string,
    data: Record<string, any>[],
    mention: TMention[],
  ) {
    const mergedMention = data.reduce((acc, { id, ...rest }) => {
      const fondMention = mention.find(
        ({ id: mentionId }) => Number(id) === Number(mentionId),
      );

      if (!fondMention) {
        return acc;
      }
      const restData =
        type === USER_TYPE ? this.getUserData(rest) : this.getTagData(rest);

      const result = {
        userValue: fondMention.userValue,
        mention: fondMention.mention,
        ...restData,
      };
      acc.push(result);

      return acc;
    }, []);

    return mergedMention;
  }

  private async buildResponse(
    mentions: TMentionMap,
  ): Promise<TResultMentionsData> {
    const users = await this.getUsers(mentions);
    const tags = await this.getTags(mentions);

    const userMention = this.mergeMentionWithData(
      USER_TYPE,
      users,
      mentions.get(USER_TYPE),
    );
    const tagMention = this.mergeMentionWithData(
      TAG_TYPE,
      tags,
      mentions.get(TAG_TYPE),
    );

    const result = {};

    if (userMention.length) {
      result[USER_TYPE] = userMention;
    }

    if (tagMention.length) {
      result[TAG_TYPE] = tagMention;
    }

    return result;
  }
}
