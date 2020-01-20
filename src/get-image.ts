import createHttpError from 'http-errors';
import { Repository } from 'typeorm';

import { APIGatewayProxyEvent } from '../lib/aws/types';
import { getRepository } from '../lib/db';
import { middy } from '../lib/middy';
import { Image } from './models';

export async function getImage(userId: string, imageId: string) {
  const repository: Repository<Image> = await getRepository<Image>(Image);
  const image: Image = await repository.findOne({
    where: {
      id: imageId,
      userId,
    },
  });

  if (!image) {
    throw new createHttpError.NotFound(`No image found with ID ${imageId}`);
  }

  return image;
}

export async function getImageApiGateway(event: APIGatewayProxyEvent) {
  const userId = 'foo';
  const { imageId } = event.pathParameters;
  // TODO: get user id from request
  const body = await getImage(userId, imageId);

  return { body };
}

export const apiGatewayHandler = middy(getImageApiGateway);
