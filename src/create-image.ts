import { APIGatewayProxyEvent } from '../lib/aws/types/aws-lambda.interface';
import { getRepository } from '../lib/db';
import { middy } from '../lib/middy';
import { validateSchema } from '../lib/middy/middlewares';
import { CreateImageDTO } from './dto';
import { Image } from './models';

export async function createImage(image: CreateImageDTO) {
  const repository = await getRepository<Image>(Image);
  const data = await repository.save(image);

  return repository.findOne(data.id);
}

export async function createImageApiGatewayHandler(event: APIGatewayProxyEvent<CreateImageDTO>) {
  const body = await createImage(event.bodyValidated);

  return { body };
}

export const apiGatewayHandler = middy(createImageApiGatewayHandler).use(validateSchema(CreateImageDTO));
