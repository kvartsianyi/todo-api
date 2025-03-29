import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@/database/entities/base.entity';
import { TodoEntity } from '@/todo/todo.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => TodoEntity, (todo) => todo.userId)
  todos: TodoEntity[];
}
