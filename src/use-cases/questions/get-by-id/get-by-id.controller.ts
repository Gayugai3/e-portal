import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Question } from 'src/infrastructure/collection/questions/questions.schema';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';


@ApiBearerAuth()
@Controller('get-by-id')
export class GetByIdController {
  constructor(private readonly questionService: QuestionService) {}

  
  @Get(':questionId')
  @UseGuards(JwtAuthGuard)
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
