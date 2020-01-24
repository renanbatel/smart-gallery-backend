import { Repository } from 'typeorm';

import { APIGatewayProxyEvent } from '../lib/aws/types';
import { getRepository } from '../lib/db';
import { middy } from '../lib/middy';
import { Image } from './models';
import { ImageStatus } from './types';

export async function getImages(event: APIGatewayProxyEvent) {
  const repository: Repository<Image> = await getRepository<Image>(Image);
  // TODO: get user id from request
  const data: Image[] = await repository.find({ where: { userId: 'foo', status: ImageStatus.ACTIVE } });

  return data;
}

export async function getImagesApiGateway(event: APIGatewayProxyEvent) {
  const body = await getImages(event);

  return { body };
}

export const apiGatewayHandler = middy(getImagesApiGateway);
