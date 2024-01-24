import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Question } from 'src/infrastructure/collection/questions/questions.schema';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';

@Controller('get-by-id')
export class GetByIdController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':questionId')
  async getQuestionById(
    @Param('questionId') questionId: string,
  ): Promise<Question> {
    try {
      const question = await this.questionService.getQuestionById(questionId);
      return question;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }
      throw error;
    }
  }
}
