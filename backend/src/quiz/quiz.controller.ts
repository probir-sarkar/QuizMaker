import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { QuizDto } from './dto/create-quiz.dto'; // Adjust the import path as necessary
import { QuizService } from './quiz.service';
import { Quiz } from './schemas/quiz.schema';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Post()
  async createQuiz(
    @Body(new ValidationPipe()) quizDto: QuizDto,
  ): Promise<Quiz> {
    const createdQuiz = await this.quizService.create(quizDto);
    console.log(createdQuiz);
    return createdQuiz;
  }
}
