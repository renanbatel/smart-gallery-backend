import { Context } from 'aws-lambda';
import { HttpError } from 'http-errors';
import { HandlerLambda } from 'middy';

export interface HandlerLambdaBase<T = any, V = any, C extends Context = Context> extends HandlerLambda<T> {
  additionalBodyData: any;
  error: HttpError;
  responseTimer: any;
}
