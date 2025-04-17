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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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
import { PaginatedResourceDto, PaginationDto, SortingDto } from '@/common/dtos';
import { QueryFilter } from '@/common/interfaces';
import { TODO_FILTERABLE_FIELDS, TODO_SORTABLE_FIELDS } from './constants';
import {
  createTodoOperation,
  createTodoSuccessResponse,
  deleteTodoOperation,
  deleteTodoSuccessResponse,
  getTodoByIdOperation,
  getTodoByIdSuccessResponse,
  getTodosOperation,
  getTodosSuccessResponse,
  jwtTokenInvalidResponse,
  notFoundResponse,
  patchTodoOperation,
  patchTodoSuccessResponse,
  queryParamsBadRequestResponse,
  validationErrorResponse,
} from '@/common/swagger/options';
import {
  ApiFilterQuery,
  ApiPaginationQuery,
  ApiSortingQuery,
} from '@/common/swagger/decorators';

@ApiBearerAuth()
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation(getTodosOperation)
  @ApiOkResponse(getTodosSuccessResponse)
  @ApiUnauthorizedResponse(jwtTokenInvalidResponse)
  @ApiBadRequestResponse(queryParamsBadRequestResponse)
  @ApiFilterQuery(TODO_FILTERABLE_FIELDS)
  @ApiSortingQuery(TODO_SORTABLE_FIELDS)
  @ApiPaginationQuery()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTodos(
    @User() user: UserEntity,
    @PaginationQuery() pagination: PaginationDto,
    @SortingQuery(TODO_SORTABLE_FIELDS) sorting: SortingDto,
    @FilteringQuery(TODO_FILTERABLE_FIELDS) filters: QueryFilter[],
  ): Promise<PaginatedResourceDto<TodoEntity>> {
    return this.todoService.findAllTodos({
      whereParams: { userId: user.id },
      pagination,
      sorting,
      filters,
    });
  }

  @ApiOperation(getTodoByIdOperation)
  @ApiOkResponse(getTodoByIdSuccessResponse)
  @ApiUnauthorizedResponse(jwtTokenInvalidResponse)
  @ApiNotFoundResponse(notFoundResponse)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
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

  @ApiOperation(createTodoOperation)
  @ApiCreatedResponse(createTodoSuccessResponse)
  @ApiUnauthorizedResponse(jwtTokenInvalidResponse)
  @ApiBadRequestResponse(validationErrorResponse)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTodo(
    @User() user: UserEntity,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<TodoEntity> {
    return this.todoService.createTodo({
      ...createTodoDto,
      userId: user.id,
    });
  }

  @ApiOperation(patchTodoOperation)
  @ApiOkResponse(patchTodoSuccessResponse)
  @ApiUnauthorizedResponse(jwtTokenInvalidResponse)
  @ApiBadRequestResponse(validationErrorResponse)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
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

  @ApiOperation(deleteTodoOperation)
  @ApiNoContentResponse(deleteTodoSuccessResponse)
  @ApiUnauthorizedResponse(jwtTokenInvalidResponse)
  @ApiBadRequestResponse(validationErrorResponse)
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
