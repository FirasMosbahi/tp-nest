import { TodoStatusEnum } from '../spec-classes/todo';
import {
  IsEnum,
  IsInstance,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import validatorsErrorMessages from '../validators-error-messages';

export default class UpdateTodoDTO {
  @MinLength(3, { message: `${validatorsErrorMessages.MIN_LENGTH}1` })
  @MaxLength(10, { message: `${validatorsErrorMessages.MAX_LENGTH}2` })
  name: string | null;
  @MinLength(10, { message: `${validatorsErrorMessages.MIN_LENGTH}1` })
  description: string | null;
  @IsOptional()
  @IsEnum(TodoStatusEnum, { message: `${validatorsErrorMessages.IS_Enum}2` })
  status: TodoStatusEnum | null;
}
