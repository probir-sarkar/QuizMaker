import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuizDocument = HydratedDocument<Quiz>;

// Create the Answer subdocument schema
@Schema()
class Answer {
  @Prop({ type: String, required: [true, 'Answer is required'], minlength: 1 })
  answer: string;

  @Prop({ type: Boolean, required: true })
  isCorrect: boolean;
}

// Create the Question subdocument schema
@Schema()
class Question {
  @Prop({
    type: String,
    required: [true, 'Question is required'],
    minlength: 1,
  })
  question: string;

  @Prop({
    type: [Answer],
    required: [true, 'At least two answers are required'],
    validate: [arrayLimit, 'At least two answers are required'],
  })
  answers: Answer[];
}

// Validator to ensure the minimum number of answers
function arrayLimit(val: any[]) {
  return val.length >= 2;
}

// Create the main Quiz schema
@Schema()
export class Quiz {
  @Prop({
    type: [Question],
    required: [true, 'At least one question is required'],
    validate: [questionArrayLimit, 'At least one question is required'],
  })
  questions: Question[];
}

// Validator to ensure the minimum number of questions
function questionArrayLimit(val: any[]) {
  return val.length >= 1;
}

// Create the Quiz schema factory
export const QuizSchema = SchemaFactory.createForClass(Quiz);
