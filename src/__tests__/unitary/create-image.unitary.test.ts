import sinon from 'sinon';

import * as db from '../../../lib/db';
import { imageBuilder } from '../../../lib/test-utils';
import * as createImage from '../../create-image';
import { ImageDTO } from '../../dto';

describe('src/create-image', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('createImage', () => {
    it('should save the image on the database and return it', async () => {
      const data: ImageDTO = imageBuilder();
      const fakeSave = sinon.fake.resolves(data);
      const fakeGetRepository = sinon.fake.resolves({ save: fakeSave });

      sinon.replace(db, 'getRepository', fakeGetRepository);

      const image = await createImage.createImage(data);

      sinon.assert.calledOnce(fakeSave);
      sinon.assert.calledOnce(fakeGetRepository);
      expect(image).toEqual(data);
    });
  });
  describe('createImageApiGatewayHandler', () => {
    it('should call createImage and return the result as the body', async () => {});
  });
});
