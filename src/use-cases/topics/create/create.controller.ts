// topic.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';
import { CreateTopicDto } from './create-topic.dto';


@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.createTopic(createTopicDto);
  }
}
