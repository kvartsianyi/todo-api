import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { DeleteResult } from 'typeorm';

import { TodoEntity } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { JwtAuthGuard } from '@/auth/guards';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  async getTodo(@Param('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    const todo = await this.todoService.findOneById(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoService.createTodo({
      title: createTodoDto.title,
    });
  }

  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity | null> {
    const updateResult = await this.todoService.updateTodo(id, updateTodoDto);

    if (!updateResult.affected) {
      throw new NotFoundException();
    }

    return this.todoService.findOneById(id);
  }

  @Delete(':id')
  removeTodo(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.todoService.deleteTodo(id);
  }
}
