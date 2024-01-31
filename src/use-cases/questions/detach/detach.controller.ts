import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';
import { DetachRequestDto } from './detach-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiBearerAuth()
@Controller('detach')
export class DetachController {
  constructor(private readonly questionService: QuestionService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
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
