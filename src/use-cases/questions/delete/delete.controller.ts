import { Controller, Delete, NotFoundException, Param } from '@nestjs/common';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';


@Controller('delete')
export class DeleteController {
    constructor(private readonly questionService: QuestionService) {}

    @Delete(':questionId')
  async deleteQuestion(@Param('questionId') questionId: string): Promise<void> {
    try {
      await this.questionService.deleteQuestion(questionId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      // Handle other types of errors as needed
      throw error;
    }
  }
}
