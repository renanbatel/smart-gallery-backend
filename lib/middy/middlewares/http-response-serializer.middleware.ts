import stringify from 'fast-json-stable-stringify';
import { OK } from 'http-status-codes';
import { MiddlewareObject } from 'middy';

import { HandlerLambdaBase } from '../types';

export function httpResponseSerializer(): MiddlewareObject<any, any> {
  return {
    async after(handler: HandlerLambdaBase) {
      if (!handler.response) {
        handler.response = {};
      }

      const statusCode = handler.response.statusCode || OK;
      let body;

      if (handler.event.httpMethod) {
        body = {
          data: handler.response.body || {},
          statusCode,
          ...handler.additionalBodyData,
        };
      } else {
        body = handler.response.body || handler.response || {};
      }

      const headers = Object.assign({}, handler.response.headers || {}, {
        'content-type': 'application/json',
      });

      if (body && body.headers) {
        delete body.headers;
      }

      handler.response = {
        statusCode,
        headers,
        body: stringify(body),
      };
    },
  };
}
