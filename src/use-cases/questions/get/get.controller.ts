import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Question } from 'src/infrastructure/collection/questions/questions.schema';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';

@ApiBearerAuth()
@Controller('getAllQuestions')
export class GetController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllQuestions(): Promise<Question[]> {
    return this.questionService.getAllQuestions();
  }
}
