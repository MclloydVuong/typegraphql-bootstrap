import * as dotenv from 'dotenv';
dotenv.config();
import * as Sentry from '@sentry/node';
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  debug: true,
  attachStacktrace: true,
});

import 'reflect-metadata';
import { GraphQLServer, Options } from 'graphql-yoga';
import { Container } from 'typedi';
import * as TypeGraphQL from 'type-graphql';
import * as TypeORM from 'typeorm';
import { WaitListUserResolver } from './resolvers/waitlist-user.resolver';
import { WaitListUser } from './database/entities/waitListUser';
import { WaitListUserSubscriber } from './database/subscribers/waitListUser.subscriber';
import { ErrorLoggerMiddleware } from './middleware/errorLoggerMiddleware';
import { formatArgumentValidationError } from 'type-graphql';

TypeGraphQL.useContainer(Container);
TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    await TypeORM.createConnection({
      type: 'postgres',
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      port: parseInt(process.env.TYPEORM_PORT),
      host: 'localhost',
      entities: [WaitListUser],
      subscribers: [WaitListUserSubscriber],
      logging: true,
    });

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [WaitListUserResolver],
      globalMiddlewares: [ErrorLoggerMiddleware],
      dateScalarMode: 'timestamp',
    });

    const server = new GraphQLServer({ schema });

    const serverOptions: Options = {
      port: process.env.PORT || 4000,
      endpoint: '/graphql',
      playground: '/playground',
      debug: true,
      tracing: true,
      formatError: formatArgumentValidationError,
    };

    server.start(serverOptions, ({ port, playground }) => {
      console.log(
        `Server is running, GraphQL Playground available at http://localhost:${port}${playground}`,
      );
    });
  } catch (error) {
    Sentry.captureException(error);
  }
}

bootstrap();
