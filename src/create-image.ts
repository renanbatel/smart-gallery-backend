import { APIGatewayProxyEvent } from '../lib/aws/types/aws-lambda.interface';
import { middy } from '../lib/middy';
import { validateSchema } from '../lib/middy/middlewares';
import { CreateImageDTO } from './dto';

export async function createImageApiGatewayHandler(event: APIGatewayProxyEvent<CreateImageDTO>) {
  return {
    body: {
      message: 'Hello Guys',
      event,
    },
  };
}

export const apiGatewayHandler = middy(createImageApiGatewayHandler).use(validateSchema(CreateImageDTO));
