import { cors, doNotWaitForEmptyEventLoop, jsonBodyParser } from 'middy/middlewares';

import { httpErrorHandler, httpResponseSerializer } from './middlewares';
import { middyCompose } from './middy-compose';

export const middy = middyCompose()
  .use(
    doNotWaitForEmptyEventLoop({
      runOnBefore: true,
      runOnError: true,
    }),
  )
  .use(httpErrorHandler())
  .use(httpResponseSerializer())
  .use(cors())
  .use(jsonBodyParser());
