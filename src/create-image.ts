import { APIGatewayProxyEvent } from '../lib/aws/types/aws-lambda.interface';
import { getRepository } from '../lib/db';
import { middy } from '../lib/middy';
import { validateSchema } from '../lib/middy/middlewares';
import { CreateImageDTO } from './dto';
import { Image } from './models';

export async function createImage(data: CreateImageDTO) {
  const repository = await getRepository<Image>(Image);
  const image = new Image();

  // TODO: get user id from request
  image.userId = 'foo';
  image.title = data.title;
  image.description = data.description || null;
  image.labels = data.labels || null;
  image.filename = data.filename;

  return repository.save(image);
}

export async function createImageApiGatewayHandler(event: APIGatewayProxyEvent<CreateImageDTO>) {
  const body = await createImage(event.bodyValidated);

  return { body };
}

export const apiGatewayHandler = middy(createImageApiGatewayHandler).use(validateSchema(CreateImageDTO));
