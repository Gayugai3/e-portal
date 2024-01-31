import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';

@ApiBearerAuth()
@Controller('delete')
export class DeleteController {
  constructor(private readonly questionService: QuestionService) {}

  @Delete(':questionId')
  @UseGuards(JwtAuthGuard)
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
