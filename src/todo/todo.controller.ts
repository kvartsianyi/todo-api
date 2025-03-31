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
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { JwtAuthGuard } from '@/auth/guards';
import { UserEntity } from '@/user/user.entity';
import { User } from '@/common/decorators';
import { PaginationDto } from '@/common/dtos';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(
    @User() user: UserEntity,
    @Query() pagination: PaginationDto,
  ): Promise<{ data: TodoEntity[]; total: number }> {
    const [todos, total] = await this.todoService.findAllTodos({
      params: { userId: user.id },
      pagination,
    });

    return { data: todos, total };
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
      title: createTodoDto.title,
      userId: user.id,
    });
  }

  @Put(':id')
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
