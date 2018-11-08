import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { setApiKey, send } from '@sendgrid/mail';
import { WaitListUser } from '../entities/waitListUser';
import { WelcomeEmail } from '../../email-templates/welcome';

@EventSubscriber()
export class WaitListUserSubscriber
  implements EntitySubscriberInterface<WaitListUser> {
  constructor() {
    setApiKey(process.env.SENDGRID_API_KEY);
  }
  listenTo() {
    return WaitListUser;
  }

  afterInsert(event: InsertEvent<WaitListUser>) {
    const { firstName, email } = event.entity;
    const emailBody = WelcomeEmail({ firstName }).html;
    send({
      to: email,
      from: 'hello@mclloyd.com',
      subject: 'testing works',
      html: emailBody,
    });
  }
}
