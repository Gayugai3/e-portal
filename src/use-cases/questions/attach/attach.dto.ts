import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AttachRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  topicId: string;
}
