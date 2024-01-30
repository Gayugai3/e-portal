import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Question } from 'src/infrastructure/collection/questions/questions.schema';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';

@Controller('getall-by-topic')
export class GetallByTopicController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':topicId/questions')
  @UseGuards(AuthGuard())
  async getQuestionsByTopic(
    @Param('topicId') topicId: string,
  ): Promise<Question[]> {
    try {
      const questions = await this.questionService.getQuestionsByTopic(topicId);
      return questions;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
