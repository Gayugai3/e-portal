import { Controller, Delete, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';
@ApiTags('Topics')
@Controller('topic')
export class DeleteController {
  constructor(private readonly topicService: TopicService) {}

  @Delete(':topicId')
  async deleteTopic(@Param('topicId') topicId: string): Promise<void> {
    try {
      await this.topicService.deleteTopic(topicId);
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
