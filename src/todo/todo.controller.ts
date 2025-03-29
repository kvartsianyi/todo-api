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
  UseGuards,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { JwtAuthGuard } from '@/auth/guards';
import { User } from '@/common/decorators/user.decorator';
import { UserEntity } from '@/user/user.entity';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(@User() user: UserEntity): Promise<TodoEntity[]> {
    return this.todoService.findAllTodos({
      userId: user.id,
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
