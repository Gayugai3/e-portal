import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DetachRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  questionId: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  topicIds: string[];
}
