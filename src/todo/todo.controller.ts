import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { JwtAuthGuard } from '@/auth/guards';
import { UserEntity } from '@/user/user.entity';
import {
  FilteringQuery,
  PaginationQuery,
  SortingQuery,
  User,
} from '@/common/decorators';
import { PaginationDto, SortingDto } from '@/common/dtos';
import { IPaginatedResource, QueryFilter } from '@/common/interfaces';
import { TODO_FILTERABLE_FIELDS, TODO_SORTABLE_FIELDS } from './constants';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTodos(
    @User() user: UserEntity,
    @PaginationQuery() pagination: PaginationDto,
    @SortingQuery(TODO_SORTABLE_FIELDS) sorting: SortingDto,
    @FilteringQuery(TODO_FILTERABLE_FIELDS) filters: QueryFilter[],
  ): Promise<IPaginatedResource<TodoEntity>> {
    return this.todoService.findAllTodos({
      whereParams: { userId: user.id },
      pagination,
      sorting,
      filters,
    });
  }

  @Get(':id')
  async getTodo(
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TodoEntity> {
    const todo = await this.todoService.findOneByParams({
      id,
      userId: user.id,
    });

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  createTodo(
    @User() user: UserEntity,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<TodoEntity> {
    return this.todoService.createTodo({
      ...createTodoDto,
      userId: user.id,
    });
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity | null> {
    const todo = await this.todoService.findOneByParams({
      id,
      userId: user.id,
    });

    if (!todo) {
      throw new NotFoundException();
    }

    await this.todoService.updateTodo(todo.id, updateTodoDto);

    return this.todoService.findOneById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTodo(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<void> {
    const todo = await this.todoService.findOneByParams({
      id,
      userId: user.id,
    });

    if (!todo) {
      throw new NotFoundException();
    }

    await this.todoService.deleteTodo(id);
  }
}
