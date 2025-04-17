import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

import { BaseEntity } from 'src/database/entities/base.entity';
import { UserEntity } from '@/user/user.entity';
import { TodoStatusEnum } from './constants';
import {
  todoDescriptionProperty,
  todoDueAtProperty,
  todoEntitySchema,
  todoOwnerProperty,
  todoStatusProperty,
  todoTitleProperty,
} from '@/common/swagger/options';

@ApiSchema(todoEntitySchema)
@Entity('todo')
export class TodoEntity extends BaseEntity {
  @ApiProperty(todoTitleProperty)
  @Column()
  title: string;

  @ApiProperty(todoDescriptionProperty)
  @Column()
  description: string;

  @ApiProperty(todoStatusProperty)
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.TODO,
  })
  status: TodoStatusEnum;

  @ApiProperty(todoOwnerProperty)
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty(todoDueAtProperty)
  @Column({ type: 'timestamptz', name: 'due_at', default: null })
  readonly dueAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
