import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModel } from '../../lib/db/models';
import { ImageStatus } from '../types';

@Entity('image')
export class Image extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 52 })
  userId: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('simple-array', { nullable: true })
  labels?: string[];

  @Column('varchar', { length: 100 })
  filename: string;

  @Column({
    type: 'enum',
    enum: ImageStatus,
    default: ImageStatus.ACTIVE,
  })
  status?: ImageStatus;
}
