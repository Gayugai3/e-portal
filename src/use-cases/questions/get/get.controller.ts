import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Question } from 'src/infrastructure/collection/questions/questions.schema';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';

@Controller('getAllQuestions')
export class GetController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllQuestions(): Promise<Question[]> {
    return this.questionService.getAllQuestions();
  }
}
