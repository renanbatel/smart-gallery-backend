import Substitute from '@fluffy-spoon/substitute';
import { HttpError } from 'http-errors';
import sinon, { SinonSpy } from 'sinon';
import uuid from 'uuid';

import { APIGatewayProxyEvent } from '../../../lib/aws/types';
import * as db from '../../../lib/db';
import { buildImage } from '../../../lib/test-utils';
import { deleteImage, deleteImageApiGatewayHandler } from '../../delete-image';
import { ImageDTO } from '../../dto';
import { Image } from '../../models';

type SetUpEntities = {
  id: string;
  data: Image;
  fakeUpdate: SinonSpy;
  fakeFindOne: SinonSpy;
  fakeGetRepository: SinonSpy;
};

const setUp = (affectedRows = 1): SetUpEntities => {
  const id: string = uuid.v4();
  const data: Image = buildImage() as Image;
  const fakeUpdate: SinonSpy = sinon.fake.resolves({ raw: { affectedRows } });
  const fakeFindOne: SinonSpy = sinon.fake.resolves(data);
  const fakeGetRepository: SinonSpy = sinon.fake.resolves({
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

describe('src/deleteImage', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('deleteImage', () => {
    it('should update the image on the database as deleted and return it', async () => {
      const { id, data, fakeUpdate, fakeFindOne, fakeGetRepository } = setUp();
      const image = await deleteImage(id);

      sinon.assert.calledOnce(fakeGetRepository);
      sinon.assert.calledWith(fakeGetRepository, Image);
      sinon.assert.calledOnce(fakeUpdate);
      sinon.assert.calledWith(fakeUpdate, id);
      expect(fakeUpdate.args[0][1].status).toBeDefined();
      expect(fakeUpdate.args[0][1].deletedAt).toBeDefined();
      sinon.assert.calledOnce(fakeFindOne);
      sinon.assert.calledWith(fakeFindOne, id);
      expect(image).toEqual(data);
    });
    it('should throw a 404 error when no rows have been affected', async () => {
      const { id } = setUp(0);
      let exception: HttpError = null;

      try {
        await deleteImage(id);
      } catch (error) {
        exception = error;
      }

      expect(exception).toBeInstanceOf(HttpError);
      expect(exception.statusCode).toBe(404);
    });
  });
  describe('deleteImageApiGatewayHandler', () => {
    it('should call deleteImage and return the result as the body', async () => {
      const { id, data } = setUp();
      const event = Substitute.for<APIGatewayProxyEvent<ImageDTO>>();

      event.pathParameters.imageId = id;

      const response = await deleteImageApiGatewayHandler(event);

      expect(response.body).toEqual(data);
    });
  });
});
