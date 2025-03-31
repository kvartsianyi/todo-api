import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoEntity } from './todo.entity';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { PaginationDto } from '@/common/dtos';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async findAllTodos({
    params = {},
    pagination = {},
  }: {
    params?: FindOptionsWhere<TodoEntity>;
    pagination?: PaginationDto;
  }): Promise<[TodoEntity[], number]> {
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');

    return queryBuilder
      .where(params)
      .skip(pagination.skip)
      .take(pagination.limit)
      .getManyAndCount();
  }

  findOneById(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findOneBy({ id });
  }

  findOneByParams(params: Partial<TodoEntity>): Promise<TodoEntity | null> {
    return this.todoRepository.findOneBy(params);
  }

  createTodo(todoDto: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todoDto);
  }

  updateTodo(id: number, todoDto: Partial<TodoEntity>): Promise<UpdateResult> {
    return this.todoRepository.update(id, todoDto);
  }

  deleteTodo(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id);
  }
}
