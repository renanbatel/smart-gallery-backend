import createHttpError from 'http-errors';
import { Repository } from 'typeorm';

import { APIGatewayProxyEvent } from '../lib/aws/types';
import { getRepository } from '../lib/db';
import { middy } from '../lib/middy';
import { Image } from './models';

export async function getImage(imageId: string) {
  const repository: Repository<Image> = await getRepository<Image>(Image);
  const image: Image = await repository.findOne(imageId);

  if (!image) {
    throw new createHttpError.NotFound(`No image found with ID ${imageId}`);
  }

  return image;
}

export async function getImageApiGateway(event: APIGatewayProxyEvent) {
  const { imageId } = event.pathParameters;
  const body = await getImage(imageId);

  return { body };
}

export const apiGatewayHandler = middy(getImageApiGateway);
