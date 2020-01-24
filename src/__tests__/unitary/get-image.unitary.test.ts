import Substitute from '@fluffy-spoon/substitute';
import { HttpError } from 'http-errors';
import sinon, { SinonSpy } from 'sinon';
import uuid from 'uuid';

import { APIGatewayProxyEvent } from '../../../lib/aws/types';
import * as db from '../../../lib/db';
import { buildImage } from '../../../lib/test-utils';
import { ImageDTO } from '../../dto';
import { getImage, getImageApiGatewayHandler } from '../../get-image';
import { Image } from '../../models';

type SetUpEntities = {
  id: string;
  data: Image;
  fakeFindOne: SinonSpy;
  fakeGetRepository: SinonSpy;
};

const setUp = (image = buildImage() as Image): SetUpEntities => {
  const id = uuid;
  const data = image;
  const fakeFindOne = sinon.fake.resolves(data);
  const fakeGetRepository = sinon.fake.resolves({ findOne: fakeFindOne });

  sinon.replace(db, 'getRepository', fakeGetRepository);

  return {
    id,
    data,
    fakeFindOne,
    fakeGetRepository,
  };
};

describe('src/deleteImage', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('deleteImage', () => {
    it('should get the image from the database and return it', async () => {
      const { id, data, fakeFindOne, fakeGetRepository } = setUp();
      const image = await getImage(id);

      sinon.assert.calledOnce(fakeGetRepository);
      sinon.assert.calledWith(fakeGetRepository, Image);
      sinon.assert.calledOnce(fakeFindOne);
      sinon.assert.calledWith(fakeFindOne, id);
      expect(image).toEqual(data);
    });
    it('should throw a 404 when no image has been found', async () => {
      const { id } = setUp(null);
      let exception = null;

      try {
        await getImage(id);
      } catch (error) {
        exception = error;
      }

      expect(exception).toBeInstanceOf(HttpError);
      expect(exception.statusCode).toBe(404);
    });
  });
  describe('getImageApiGatewayHandler', () => {
    it('should call getImage and return it as the body', async () => {
      const { id, data } = setUp();
      const event = Substitute.for<APIGatewayProxyEvent<ImageDTO>>();

      event.pathParameters.imageId = id;

      const response = await getImageApiGatewayHandler(event);

      expect(response.body).toEqual(data);
    });
  });
});
