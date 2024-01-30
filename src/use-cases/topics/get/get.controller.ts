import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Topic } from 'src/infrastructure/collection/topics/topics.schema';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';

@Controller('getAllTopics')
export class GetController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllTopics(): Promise<Topic[]> {
    return this.topicService.getAllTopics();
  }
}
