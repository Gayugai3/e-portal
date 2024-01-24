import { Body, Controller, NotFoundException, Put } from '@nestjs/common';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';
import { AttachRequestDto } from './attach.dto';

@Controller('attach')
export class AttachController {
  constructor(private readonly questionService: QuestionService) {}

  @Put()
  async attachQuestion(
    @Body() attachRequestDto: AttachRequestDto,
  ): Promise<void> {
    try {
      await this.questionService.attachQuestion(attachRequestDto);
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
