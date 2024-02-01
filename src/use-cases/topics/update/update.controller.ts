import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';
import { UpdateTopicDto } from './update-topic.dto';

@ApiTags('Topics')
@Controller('topic')
export class UpdateController {
  constructor(private readonly topicService: TopicService) {}

  @Put('/:topicId')
  async updateTopic(
    @Param('topicId') topicId: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<void> {
    try {
      await this.topicService.updateTopic(topicId, updateTopicDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        // Handle other types of errors
        throw error;
      }
    }
  }
}
