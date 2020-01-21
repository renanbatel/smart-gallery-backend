import faker from 'faker';
import uuid from 'uuid';

import { ImageDTO } from '../../src/dto';

export function imageBuilder(): ImageDTO {
  const image: ImageDTO = new ImageDTO();

  image.title = faker.lorem.sentence();
  image.description = faker.lorem.paragraph();
  image.labels = [faker.lorem.word(), faker.lorem.word()];
  image.filename = `image_${uuid.v4()}.png`;

  return image;
}
