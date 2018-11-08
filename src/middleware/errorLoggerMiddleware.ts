import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';
import { Service } from 'typedi';
import * as Sentry from '@sentry/node';

export interface Context {
  username?: string;
}

@Service()
export class ErrorLoggerMiddleware implements MiddlewareInterface<Context> {
  constructor() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      debug: true,
      attachStacktrace: true,
    });
  }

  async use({ context, info }: ResolverData<Context>, next: NextFn) {
    try {
      return await next();
    } catch (err) {
      // TODO filter out user errors
      Sentry.captureException(err);
      throw err;
    }
  }
}
