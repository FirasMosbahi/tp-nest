import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import Todo from '../spec-classes/todo';
import CreateTodoDTO from '../DTO/create-todo-DTO';
import UpdateTodoDTO from '../DTO/update-todo-DTO';
import TodoEntity from '../entities/todo-entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(): Array<Todo> {
    return this.todoService.getTodos();
  }
  @Get('/:id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todoService.getTodoById(id);
  }
  @Post()
  @Version('1')
  createTodo(@Body() body: CreateTodoDTO): Todo {
    return this.todoService.createTodo(body);
  }
  @Patch('/:id')
  @Version('1')
  updateTodoById(@Param('id') id: string, @Body() body: UpdateTodoDTO): Todo {
    return this.todoService.updateTodoById(id, body);
  }
  @Delete('/:id')
  deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteTodoByName(id);
  }
  @Post()
  @Version('2')
  async AddTodoToDb(@Body() body: CreateTodoDTO): Promise<TodoEntity> {
    return await this.todoService.addTodoToDb(body);
  }
  @Patch('/:id')
  @Version('2')
  async UpdateTodoByIdToDb(
    @Param('id') id: number,
    @Body() body: UpdateTodoDTO,
  ) {
    return await this.todoService.updateTodoByIdToDb(id, body);
  }
}
