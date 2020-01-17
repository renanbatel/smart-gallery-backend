import stringify from 'fast-json-stable-stringify';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { MiddlewareObject } from 'middy';

import { HandlerLambdaBase } from '../types';

export function httpErrorHandler(): MiddlewareObject<any, any> {
  return {
    async onError(handler: HandlerLambdaBase) {
      const { statusCode = INTERNAL_SERVER_ERROR, name: error, message = 'Internal Server Error', errors: rawErrors } = handler.error;
      const { awsRequestId: requestId } = handler.context;
      const errors = normalizeErrors(rawErrors);
      const errorResponse = stringify({ error, message, requestId, statusCode, errors });

      console.error(errorResponse);

      handler.response = {
        statusCode,
        body: errorResponse,
        headers: {
          'content-type': 'application/json',
        },
      };
    },
  };
}

export function normalizeErrors(errors) {
  if (!errors || !Array.isArray(errors) || !errors.length) {
    return undefined;
  }

  return errors.map(({ property, value, constraints, children }) => ({
    property,
    value,
    constraints,
    children: normalizeErrors(children),
  }));
}
