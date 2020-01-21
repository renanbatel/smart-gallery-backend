import { APIGatewayEventRequestContext } from 'aws-lambda';

import { APIGatewayProxyEvent } from '../aws/types';

export function buildEvent<T>() {
  const event: APIGatewayProxyEvent<T> = new (class implements APIGatewayProxyEvent<T> {
    bodyValidated: T;
    body: any;
    headers: { [name: string]: string };
    multiValueHeaders: { [name: string]: string[] };
    httpMethod: string;
    isBase64Encoded: boolean;
    path: string;
    pathParameters: { [name: string]: string };
    queryStringParameters: { [name: string]: string };
    multiValueQueryStringParameters: { [name: string]: string[] };
    stageVariables: { [name: string]: string };
    requestContext: APIGatewayEventRequestContext;
    resource: string;
  })();

  return event;
}
