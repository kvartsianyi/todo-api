import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoEntity } from './todo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  findAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  findOneById(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findOneBy({ id });
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
