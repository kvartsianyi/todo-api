import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

import { BaseEntity } from '@/database/entities/base.entity';
import { TodoEntity } from '@/todo/todo.entity';
import { userEntitySchema } from '@/common/swagger/options/api-schema';
import {
  passwordProperty,
  usernameProperty,
} from '@/common/swagger/options/api-property';

@ApiSchema(userEntitySchema)
@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty(usernameProperty)
  @Column({ unique: true })
  username: string;

  @ApiProperty(passwordProperty)
  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => TodoEntity, (todo) => todo.userId)
  todos: TodoEntity[];
}
