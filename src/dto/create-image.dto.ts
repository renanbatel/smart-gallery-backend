import { IsArray, IsByteLength, IsEnum, IsOptional, IsString } from 'class-validator';

import { IsImageFilename } from '../../lib/validators';
import { ImageStatus } from '../types';

export class CreateImageDTO {
  @IsString()
  @IsByteLength(1, 255)
  title: string;

  @IsString()
  @IsByteLength(1, 65535)
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  labels?: string[];

  @IsString()
  @IsByteLength(46, 47)
  @IsImageFilename()
  filename: string;

  @IsEnum(ImageStatus)
  @IsOptional()
  status?: ImageStatus;
}
