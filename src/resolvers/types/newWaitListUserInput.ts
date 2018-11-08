import { InputType, Field } from 'type-graphql';
import { WaitListUser } from '../../database/entities/waitListUser';

@InputType({ description: 'New Wait List User Data' })
export class NewWaitListUserInput implements Partial<WaitListUser> {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
