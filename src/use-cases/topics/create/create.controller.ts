// topic.controller.ts

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';
import { CreateTopicDto } from './create-topic.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Topics')
@ApiBearerAuth()
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.createTopic(createTopicDto);
  }
}
