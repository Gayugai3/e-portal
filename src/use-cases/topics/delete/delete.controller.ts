import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';

@ApiTags('Topics')
@ApiBearerAuth()
@Controller('topic')
export class DeleteController {
  constructor(private readonly topicService: TopicService) {}

  @Delete(':topicId')
  @UseGuards(JwtAuthGuard)
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
