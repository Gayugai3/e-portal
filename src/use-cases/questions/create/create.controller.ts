// question.controller.ts

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';
import { CreateQuestionDto } from './create-question.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }
}
