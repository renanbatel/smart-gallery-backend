import sinon, { SinonSpy } from 'sinon';

import * as db from '../../../lib/db';
import { buildImage } from '../../../lib/test-utils';
import { getImages, getImagesApiGateway } from '../../get-images';
import { Image } from '../../models';
import { ImageStatus } from '../../types';

type SetUpEntities = {
  data: Image[];
  fakeFind: SinonSpy;
  fakeGetRepository: SinonSpy;
};

const setUp = (): SetUpEntities => {
  const data = [buildImage(), buildImage()] as Image[];
  const fakeFind = sinon.fake.resolves(data);
  const fakeGetRepository = sinon.fake.resolves({ find: fakeFind });

  sinon.replace(db, 'getRepository', fakeGetRepository);

  return {
    data,
    fakeFind,
    fakeGetRepository,
  };
};

describe('src/getImages', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('getImages', () => {
    it('should get the images from the database and return it', async () => {
      const { data, fakeFind, fakeGetRepository } = setUp();
      const images = await getImages(null);

      sinon.assert.calledOnce(fakeGetRepository);
      sinon.assert.calledWith(fakeGetRepository, Image);
      sinon.assert.calledOnce(fakeFind);
      expect(fakeFind.args[0][0].where.userId).toBeDefined();
      expect(fakeFind.args[0][0].where.status).toBe(ImageStatus.ACTIVE);
      expect(images).toEqual(data);
    });
  });
  describe('getImagesApiGatewayHandler', () => {
    it('should call getImages and return the result as the body', async () => {
      const { data } = setUp();
      const response = await getImagesApiGateway(null);

      expect(response.body).toEqual(data);
    });
  });
});
