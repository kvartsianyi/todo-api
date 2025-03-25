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
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { DeleteResult } from 'typeorm';

interface Todo {
  id?: number;
  title: string;
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Controller('todos')
export class TodoController {
  todos: Todo[] = [];

  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  async getTodo(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    const todo = await this.todoService.findOneById(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  @Post()
  addTodo(@Body() body: Todo): Promise<Todo> {
    return this.todoService.addTodo({
      title: body.title,
      isCompleted: false,
    });
  }

  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Todo,
  ): Promise<Todo | null> {
    const updateResult = await this.todoService.updateTodo(id, body);

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
