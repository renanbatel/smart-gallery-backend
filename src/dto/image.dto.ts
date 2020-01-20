import { IsArray, IsByteLength, IsOptional, IsString } from 'class-validator';

import { getVGroup, VGroup } from '../../lib/utils';
import { IsImageFilename } from '../../lib/validators';

export class ImageDTO {
  @IsString(getVGroup(VGroup.CREATE_UPDATE))
  @IsByteLength(1, 255, getVGroup(VGroup.CREATE_UPDATE))
  title: string;

  @IsString(getVGroup(VGroup.CREATE_UPDATE))
  @IsByteLength(1, 65535, getVGroup(VGroup.CREATE_UPDATE))
  @IsOptional(getVGroup(VGroup.CREATE_UPDATE))
  description?: string;

  @IsArray(getVGroup(VGroup.CREATE_UPDATE))
  @IsString({ each: true, ...getVGroup(VGroup.CREATE_UPDATE) })
  @IsOptional(getVGroup(VGroup.CREATE_UPDATE))
  labels?: string[];

  @IsString(getVGroup(VGroup.CREATE))
  @IsByteLength(46, 47, getVGroup(VGroup.CREATE))
  @IsImageFilename(getVGroup(VGroup.CREATE))
  @IsOptional(getVGroup(VGroup.UPDATE))
  filename: string;
}
