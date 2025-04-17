import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { TodoEntity } from './todo.entity';
import { PaginatedResourceDto, PaginationDto, SortingDto } from '@/common/dtos';
import { applyFilters, paginateQuery, applySorting } from '@/common/utils';
import { QueryFilter } from '@/common/interfaces';
import { PAGINATION_DEFAULT_PARAMS } from '@/common/constants';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async findAllTodos({
    whereParams = {},
    pagination = PAGINATION_DEFAULT_PARAMS,
    sorting = {},
    filters = [],
  }: {
    whereParams?: FindOptionsWhere<TodoEntity>;
    pagination?: PaginationDto;
    sorting?: SortingDto;
    filters?: QueryFilter[];
  }): Promise<PaginatedResourceDto<TodoEntity>> {
    const qb = this.todoRepository
      .createQueryBuilder(TodoEntity.name)
      .where(whereParams);

    applySorting(qb, sorting);
    applyFilters(qb, filters);

    return paginateQuery(qb, pagination);
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
