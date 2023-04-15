import { TodoStatusEnum } from '../spec-classes/todo';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import validatorsErrorMessages from '../validators-error-messages';

export default class CreateTodoDTO {
  @IsNotEmpty({ message: validatorsErrorMessages.REQUIRED })
  @MinLength(3, { message: `${validatorsErrorMessages.MIN_LENGTH}2` })
  @MaxLength(10, { message: `${validatorsErrorMessages.MAX_LENGTH}3` })
  name: string;
  @IsNotEmpty({ message: validatorsErrorMessages.REQUIRED })
  @MinLength(10, { message: `${validatorsErrorMessages.MIN_LENGTH}2` })
  description: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum, { message: `${validatorsErrorMessages.IS_Enum}2` })
  status: TodoStatusEnum | null;
}
