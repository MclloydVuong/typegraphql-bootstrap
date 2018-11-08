import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, Column } from 'typeorm';
import { Base } from './base';

@ObjectType()
@Entity({ name: 'WaitListUsers' })
export class WaitListUser extends Base {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;
}
