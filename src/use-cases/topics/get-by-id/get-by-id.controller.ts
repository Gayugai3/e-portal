import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';

@ApiTags('Topics')
@Controller('topic')
export class GetByIdController {
  constructor(private readonly topicService: TopicService) {}
  @Get(':topicId')
  async getTopicDetails(@Param('topicId') topicId: string): Promise<any> {
    try {
      const topic = await this.topicService.getTopicById(topicId);
      return { topic };
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
