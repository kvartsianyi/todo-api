import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from 'src/database/entities/base.entity';
import { UserEntity } from '@/user/user.entity';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: false, name: 'is_completed' })
  isCompleted: boolean;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
