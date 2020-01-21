import { APIGatewayProxyEvent } from '../lib/aws/types';
import { getRepository } from '../lib/db';
import { middy } from '../lib/middy';
import { Image } from './models';
import { ImageStatus } from './types';

import createHttpError = require('http-errors');

export async function deleteImage(imageId: string) {
  const repository = await getRepository<Image>(Image);
  const update = await repository.update(imageId, { status: ImageStatus.DELETED, deletedAt: new Date().toISOString() });

  if (update.raw.affectedRows) {
    return repository.findOne(imageId);
  }

  throw new createHttpError.NotFound(`No image found with the ID ${imageId}`);
}

export async function deleteImageApiGatewayHandler(event: APIGatewayProxyEvent) {
  const { imageId } = event.pathParameters;
  const body = await deleteImage(imageId);

  return { body };
}

export const apiGatewayHandler = middy(deleteImageApiGatewayHandler);
