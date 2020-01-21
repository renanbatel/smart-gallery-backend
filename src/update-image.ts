import createHttpError from 'http-errors';

import { APIGatewayProxyEvent } from '../lib/aws/types';
import { getRepository } from '../lib/db';
import { middy } from '../lib/middy';
import { validateSchema } from '../lib/middy/middlewares';
import { VGroup } from '../lib/utils';
import { ImageDTO } from './dto';
import { Image } from './models';

export async function updateImage(imageId: string, image: ImageDTO) {
  const repository = await getRepository<Image>(Image);
  const update = await repository.update(imageId, image);

  if (update.raw.affectedRows) {
    return repository.findOne(imageId);
  }

  throw new createHttpError.NotFound(`No image found with the ID ${imageId}`);
}

export async function updateImageApiGatewayHandler(event: APIGatewayProxyEvent<ImageDTO>) {
  const { imageId } = event.pathParameters;
  const body = await updateImage(imageId, event.bodyValidated);

  return { body };
}

export const apiGatewayHandler = middy(updateImageApiGatewayHandler).use(validateSchema(ImageDTO, VGroup.UPDATE));
