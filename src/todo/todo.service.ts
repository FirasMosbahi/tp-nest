import { Inject, Injectable } from '@nestjs/common';
import Todo, { TodoStatusEnum } from '../spec-classes/todo';
import CreateTodoDTO from '../DTO/create-todo-DTO';
import UpdateTodoDTO from '../DTO/update-todo-DTO';
import IT from '../injection-tokens-config';
import { InjectRepository } from '@nestjs/typeorm';
import TodoEntity from '../entities/todo-entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @Inject(IT.UUID_TOKEN) private uuidv4,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  private todos: Array<Todo>;
  getTodos(): Array<Todo> {
    return this.todos;
  }
  createTodo(createTodoDTO: CreateTodoDTO): Todo {
    let status: TodoStatusEnum;
    createTodoDTO.status
      ? (status = createTodoDTO.status)
      : (status = TodoStatusEnum.waiting);
    const todo: Todo = new Todo(
      this.uuidv4(),
      createTodoDTO.name,
      createTodoDTO.description,
      new Date(),
      status,
    );
    this.todos.push(todo);
    return todo;
  }
  deleteTodoByName(id: string): Todo {
    const todoToDelete = this.todos.find((todo) => todo.id === id);
    this.todos.filter((todo) => todo !== todoToDelete);
    return todoToDelete;
  }
  updateTodoById(id: string, updateTodoDTO: UpdateTodoDTO): Todo {
    const todoToUpdateIndex: number = this.todos.findIndex(
      (todo) => todo.id === id,
    );
    if (updateTodoDTO.name !== null) {
      this.todos[todoToUpdateIndex].name = updateTodoDTO.name;
    }
    if (updateTodoDTO.description !== null) {
      this.todos[todoToUpdateIndex].description = updateTodoDTO.description;
    }
    if (updateTodoDTO.status !== null) {
      this.todos[todoToUpdateIndex].status = updateTodoDTO.status;
    }
    return this.todos[todoToUpdateIndex];
  }
  getTodoById(id: string): Todo {
    return this.todos.find((todo) => todo.id === id);
  }
  async addTodoToDb(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    const todoToCreate: TodoEntity = new TodoEntity(
      createTodoDTO.name,
      createTodoDTO.description,
      createTodoDTO.status,
    );
    await this.todoRepository.save(todoToCreate);
    return todoToCreate;
  }
  async updateTodoByIdToDb(id: number, updateTodoDTO: UpdateTodoDTO) {
    let updates = {};
    if (updateTodoDTO.name !== null) {
      updates = { name: updateTodoDTO.name, ...updates };
    }
    if (updateTodoDTO.description !== null) {
      updates = { description: updateTodoDTO.description, ...updates };
    }
    if (updateTodoDTO.status !== null) {
      updates = { status: updateTodoDTO.status, ...updates };
    }
    const todoToUpdate = await this.todoRepository.update(id, updates);
    return updates;
  }
}
