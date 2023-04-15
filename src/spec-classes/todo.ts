export enum TodoStatusEnum {
  'actif' = 'en cours',
  'waiting' = 'en attente',
  'done' = 'finalisé',
}

export default class Todo {
  id: string;
  name: string;
  description: string;
  dateDeCreation: Date;
  status: TodoStatusEnum;
  constructor(
    id: string,
    name: string,
    description: string,
    dateDeCreation: Date,
    status: TodoStatusEnum,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dateDeCreation = dateDeCreation;
    this.status = status;
  }
}
