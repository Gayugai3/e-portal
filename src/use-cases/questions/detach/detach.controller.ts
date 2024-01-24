import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';
import { DetachRequestDto } from './detach-request.dto';

@Controller('detach')
export class DetachController {
  constructor(private readonly questionService: QuestionService) {}

  @Put()
  async detachQuestion(@Body() detachRequestDto: DetachRequestDto): Promise<void> {
    try {
        await this.questionService.detachQuestion(detachRequestDto);
        // console.log(detachRequestDto +' from controller')
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
