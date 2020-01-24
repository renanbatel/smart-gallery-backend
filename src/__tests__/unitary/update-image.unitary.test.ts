import Substitute from '@fluffy-spoon/substitute';
import { HttpError } from 'http-errors';
import sinon, { SinonSpy } from 'sinon';
import uuid from 'uuid';

import { APIGatewayProxyEvent } from '../../../lib/aws/types';
import * as db from '../../../lib/db';
import { buildImage } from '../../../lib/test-utils';
import { ImageDTO } from '../../dto';
import { Image } from '../../models';
import { updateImage, updateImageApiGatewayHandler } from '../../update-image';

type SetUpEntities = {
  id: string;
  data: Image;
  fakeUpdate: SinonSpy;
  fakeFindOne: SinonSpy;
  fakeGetRepository: SinonSpy;
};

const setUp = (affectedRows = 1): SetUpEntities => {
  const id = uuid.v4();
  const data = buildImage() as Image;
  const fakeUpdate = sinon.fake.resolves({ raw: { affectedRows } });
  const fakeFindOne = sinon.fake.resolves(data);
  const fakeGetRepository = sinon.fake.resolves({
    update: fakeUpdate,
    findOne: fakeFindOne,
  });

  sinon.replace(db, 'getRepository', fakeGetRepository);

  return {
    id,
    data,
    fakeUpdate,
    fakeFindOne,
    fakeGetRepository,
  };
};

describe('src/updateImage', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('updateImage', () => {
    it('should update the image on database and return it', async () => {
      const { id, data, fakeUpdate, fakeFindOne, fakeGetRepository } = setUp();
      const imageDto = buildImage();
      const image = await updateImage(id, imageDto);

      sinon.assert.calledOnce(fakeGetRepository);
      sinon.assert.calledWith(fakeGetRepository, Image);
      sinon.assert.calledOnce(fakeUpdate);
      sinon.assert.calledWith(fakeUpdate, id, imageDto);
      sinon.assert.calledOnce(fakeFindOne);
      sinon.assert.calledWith(fakeFindOne, id);
      expect(image).toEqual(data);
    });
    it('should return a 404 when no rows have been affected', async () => {
      const { id } = setUp(0);
      const imageDto = buildImage();
      let exception = null;

      try {
        await updateImage(id, imageDto);
      } catch (error) {
        exception = error;
      }

      expect(exception).toBeInstanceOf(HttpError);
      expect(exception.statusCode).toBe(404);
    });
  });
  describe('updateImageApiGatewayHandler', () => {
    it('should call update image and return the result as the body', async () => {
      const { id, data } = setUp();
      const imageDto = buildImage();
      const event = Substitute.for<APIGatewayProxyEvent<ImageDTO>>();

      event.bodyValidated = imageDto;
      event.pathParameters.imageId = id;

      const response = await updateImageApiGatewayHandler(event);

      expect(response.body).toEqual(data);
    });
  });
});
