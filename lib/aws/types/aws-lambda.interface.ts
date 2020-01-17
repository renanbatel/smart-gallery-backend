import { APIGatewayProxyEvent as APIGatewayProxyEventOriginal } from 'aws-lambda';

export interface APIGatewayProxyEvent<T = unknown> extends APIGatewayProxyEventOriginal {
  bodyValidated: T;
  body: any;
}
