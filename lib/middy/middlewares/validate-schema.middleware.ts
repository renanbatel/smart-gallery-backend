import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import createHttpError from 'http-errors';
import get from 'lodash.get';
import { MiddlewareObject } from 'middy';

import { getVGroup, VGroup } from '../../../lib/utils';
import { HandlerLambdaBase, ValidateSchemaConstructable } from '../types';

const defaultOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
};

export function validateSchema<T>(
  SchemaModel: ValidateSchemaConstructable<T>,
  vGroup?: VGroup,
  validatorOptions: ValidatorOptions = {},
): MiddlewareObject<any, any> {
  return {
    async before(handler: HandlerLambdaBase) {
      const isHttpRequest = get(handler, 'event.httpMethod');
      const body = get(handler, isHttpRequest ? 'event.body' : 'event', null);
      const toValidate = Object.assign(new SchemaModel(), body);

      validatorOptions = {
        ...defaultOptions,
        ...validatorOptions,
      };

      const errors: ValidationError[] =
        vGroup !== undefined
          ? await validate(toValidate, { ...validatorOptions, ...getVGroup(vGroup) })
          : await validate(toValidate, validatorOptions);

      if (isHttpRequest) {
        handler.event.bodyValidated = toValidate;
      } else {
        handler.event = toValidate;
      }

      if (errors.length) {
        const errorResult = new createHttpError.BadRequest();

        errorResult.errors = errors;

        throw errorResult;
      }
    },
  };
}
