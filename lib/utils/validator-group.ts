import { VGroup } from './types';

const CREATE = 'create';
const READ = 'read';
const UPDATE = 'update';
const DELETE = 'delete';
const map = {
  [VGroup.CREATE]: [CREATE],
  [VGroup.READ]: [READ],
  [VGroup.UPDATE]: [UPDATE],
  [VGroup.DELETE]: [DELETE],
  [VGroup.EXCEPT_CREATE]: [READ, UPDATE, DELETE],
  [VGroup.EXCEPT_READ]: [CREATE, UPDATE, DELETE],
  [VGroup.EXCEPT_UPDATE]: [CREATE, READ, DELETE],
  [VGroup.EXCEPT_DELETE]: [CREATE, READ, UPDATE],
  [VGroup.CRUD]: [CREATE, READ, UPDATE, DELETE],
  [VGroup.CREATE_UPDATE]: [CREATE, UPDATE],
};

export const getVGroup = (value: VGroup) => ({
  groups: map[value],
});
