import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './todo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOneById(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  addTodo(todoDto: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.save(todoDto);
  }

  updateTodo(id: number, todoDto: Partial<Todo>): Promise<UpdateResult> {
    return this.todoRepository.update(id, todoDto);
  }

  deleteTodo(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id);
  }
}
