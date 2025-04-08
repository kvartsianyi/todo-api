import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from 'src/database/entities/base.entity';
import { UserEntity } from '@/user/user.entity';
import { TodoStatusEnum } from './constants';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.TODO,
  })
  status: TodoStatusEnum;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'timestamptz', name: 'due_at', default: null })
  readonly dueAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
