import {TodoStatusEnum} from "../spec-classes/todo";

export default class FindTodoFilterDTO{
    description : string|null;
    status : TodoStatusEnum|null;
    page : number|null;
    take : number|null;
}