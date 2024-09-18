import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { QuizDto } from './dto/create-quiz.dto';
@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }
  async create(quiz: QuizDto): Promise<Quiz> {
    const createdQuiz = new this.quizModel(quiz);
    return createdQuiz.save();
  }
}
