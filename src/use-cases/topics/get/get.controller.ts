import { Controller, Get } from '@nestjs/common';
import { Topic } from 'src/infrastructure/collection/topics/topics.schema';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';

@Controller('getAllTopics')
export class GetController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getAllTopics(): Promise<Topic[]> {
    return this.topicService.getAllTopics();
  }
}
