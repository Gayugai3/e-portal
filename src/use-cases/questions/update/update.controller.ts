import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';
import { UpdateQuestionDto } from './update-question.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('update')
export class UpdateController {
  constructor(private readonly questionService: QuestionService) {}

  @Put('/:questionId')
  @UseGuards(AuthGuard())
  async updateQuestion(
    @Param('questionId') questionId: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    try {
      const updatedQuestion = await this.questionService.updateQuestion(
        questionId,
        updateQuestionDto,
      );
      return { success: true, data: updatedQuestion };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
