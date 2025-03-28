import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@/database/entities/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;
}
