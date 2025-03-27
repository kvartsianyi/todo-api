import { Entity, Column } from 'typeorm';

import { BaseEntity } from 'src/database/entities/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;
}
