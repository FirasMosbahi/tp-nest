import { HttpException, Inject, Injectable } from '@nestjs/common';
import Todo, { TodoStatusEnum } from '../spec-classes/todo';
import CreateTodoDTO from '../DTO/create-todo-DTO';
import UpdateTodoDTO from '../DTO/update-todo-DTO';
import IT from '../injection-tokens-config';
import { InjectRepository } from '@nestjs/typeorm';
import TodoEntity from '../entities/todo-entity';
import { FindManyOptions, Repository } from 'typeorm';
import FindTodoFilterDTO from '../DTO/find-todo-filter-DTO';
import { take } from 'rxjs';

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
  async deleteTodoByIdFromBd(id: number) {
    await this.todoRepository.delete({ id });
    return `todo with id : ${id} deleted succcessfully`;
  }
  async softRemoveTodoByIdFromBd(id: number): Promise<string> {
    await this.todoRepository.softDelete({ id });
    return `todo with id : ${id} soft deleted successfully`;
  }
  async recoverTodoByIdToBd(id: number): Promise<TodoEntity> {
    return await this.todoRepository.recover({ id });
  }
  async countTodosPerStatus() {
    return {
      actif: await this.todoRepository.count({
        where: { status: TodoStatusEnum.actif },
      }),
      waiting: await this.todoRepository.count({
        where: { status: TodoStatusEnum.waiting },
      }),
      done: await this.todoRepository.count({
        where: { status: TodoStatusEnum.done },
      }),
    };
  }
  async todosEndpoint(
    filterDTO: FindTodoFilterDTO,
  ): Promise<Array<TodoEntity>> {
    let filter1 = {};
    let filter2 = {};
    if (filterDTO.status !== null) {
      filter1 = { status: filterDTO.status };
      filter2 = { status: filterDTO.status };
    }
    if (filterDTO.description !== null) {
      filter1 = { description: filterDTO.description, ...filter1 };
      filter2 = { name: filterDTO.description, ...filter2 };
    }
    let options: FindManyOptions = {
      where: [filter1, filter2],
      withDeleted: true,
    };
    if (filterDTO.page && filterDTO.take && options) {
      options = {
        take: filterDTO.take,
        skip: filterDTO.take * (filterDTO.page - 1),
        ...options,
      };
    }
    return await this.todoRepository.find(options);
  }
  async todoEndpointById(id: number): Promise<TodoEntity> {
    const todos: Array<TodoEntity> = await this.todoRepository.find({
      where: { id },
      withDeleted: true,
    });
    if (todos.length) {
      return todos[0];
    } else {
      throw new HttpException('no todo with that id', 404);
    }
  }
}
