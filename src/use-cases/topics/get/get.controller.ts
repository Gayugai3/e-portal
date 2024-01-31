import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Topic } from 'src/infrastructure/collection/topics/topics.schema';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';

@ApiBearerAuth()
@Controller('getAllTopics')
export class GetController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTopics(): Promise<Topic[]> {
    return this.topicService.getAllTopics();
  }
}
