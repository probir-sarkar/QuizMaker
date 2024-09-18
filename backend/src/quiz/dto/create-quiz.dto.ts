import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsNotEmpty({ message: 'Answer is required' })
  answer: string;

  @IsBoolean()
  isCorrect: boolean;
}

class QuestionDto {
  @IsNotEmpty({ message: 'Question is required' })
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ArrayMinSize(2, { message: 'At least two answers are required' })
  answers: AnswerDto[];
}

export class QuizDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  @ArrayMinSize(1, { message: 'At least one question is required' })
  questions: QuestionDto[];
}
