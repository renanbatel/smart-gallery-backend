import { Substitute } from '@fluffy-spoon/substitute';
import sinon from 'sinon';

import { APIGatewayProxyEvent } from '../../../lib/aws/types';
import * as db from '../../../lib/db';
import { imageBuilder } from '../../../lib/test-utils';
import { createImage, createImageApiGatewayHandler } from '../../create-image';
import { ImageDTO } from '../../dto';

const setUp = () => {
  const data: ImageDTO = imageBuilder();
  const fakeSave = sinon.fake.resolves(data);
  const fakeGetRepository = sinon.fake.resolves({ save: fakeSave });

  sinon.replace(db, 'getRepository', fakeGetRepository);

  return {
    data,
    fakeSave,
    fakeGetRepository,
  };
};

describe('src/create-image', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('createImage', () => {
    it('should save the image on the database and return it', async () => {
      const { data, fakeSave, fakeGetRepository } = setUp();
      const image = await createImage(data);

      sinon.assert.calledOnce(fakeSave);
      sinon.assert.calledOnce(fakeGetRepository);
      expect(image).toEqual(data);
    });
  });
  describe('createImageApiGatewayHandler', () => {
    it('should call createImage and return the result as the body', async () => {
      const { data } = setUp();
      const event = Substitute.for<APIGatewayProxyEvent<ImageDTO>>();

      event.bodyValidated = data;

      const response = await createImageApiGatewayHandler(event);

      expect(response.body).toEqual(data);
    });
  });
});
