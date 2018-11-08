import { Resolver, Arg, Mutation, Query } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { WaitListUser } from '../database/entities/waitListUser';
import { NewWaitListUserInput } from './types/newWaitListUserInput';

@Resolver(of => WaitListUser)
export class WaitListUserResolver {
  constructor(
    @InjectRepository(WaitListUser)
    private readonly waitListRepository: Repository<WaitListUser>,
  ) {}

  @Query(returns => [WaitListUser])
  async getWaitList() {
    throw new Error('Testing');
  }

  @Mutation(returns => WaitListUser)
  async signupWaitListUser(
    @Arg('newWaitListUserData') newWaitListUserData: NewWaitListUserInput,
  ): Promise<WaitListUser> {
    console.log(newWaitListUserData);
    const newWaitListUser = this.waitListRepository.create(newWaitListUserData);
    return await this.waitListRepository.save(newWaitListUser);
  }
}
