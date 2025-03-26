import { Entity, Column } from 'typeorm';

import { BaseEntity } from 'src/database/entities/base.entity';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: false, name: 'is_completed' })
  isCompleted: boolean;
}
