import {
  Controller,
  Get,
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
export class GetByIdController {
  constructor(private readonly topicService: TopicService) {}
  @Get(':topicId')
  @UseGuards(JwtAuthGuard)
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
