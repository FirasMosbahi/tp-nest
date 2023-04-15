import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from '../spec-classes/todo';
import TraceTraker from './trace_traker';

@Entity('todo')
export default class TodoEntity extends TraceTraker {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: TodoStatusEnum })
  status: TodoStatusEnum;
  constructor(
    name: string,
    description: string,
    status: TodoStatusEnum | null,
  ) {
    super();
    this.name = name;
    this.description = description;
    this.status = status || TodoStatusEnum.waiting;
  }
}
