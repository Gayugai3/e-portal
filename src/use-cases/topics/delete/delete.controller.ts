import { Controller, Delete, NotFoundException, Param } from '@nestjs/common';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';

@Controller('delete')
export class DeleteController {
//   constructor(private readonly topicService: TopicService) {}

//   @Delete(':topicId')
//   async deleteTopic(@Param('topicId') topicId: string): Promise<void> {
//     try {
//       await this.topicService.deleteTopic(topicId);
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw new NotFoundException(error.message);
//       } else {
//         // Handle other types of errors
//         throw error;
//       }
//     }
//   }
}
