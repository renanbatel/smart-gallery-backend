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

  if (!update.raw.affectedRows) {
    throw new createHttpError.NotFound(`No image found with the ID ${imageId}`);
  }

  return repository.findOne(imageId);
}

export async function updateImageApiGatewayHandler(event: APIGatewayProxyEvent<ImageDTO>) {
  const { imageId } = event.pathParameters;
  const updated = await updateImage(imageId, event.bodyValidated);

  return {
    body: updated,
  };
}

export const apiGatewayHandler = middy(updateImageApiGatewayHandler).use(validateSchema(ImageDTO, VGroup.UPDATE));
