// question.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Question', example: 'Question 1' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ description: 'answer', example: 'Answer 1' })
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty({ description: 'Topic_IDs', example: 'Q_id' })
  @IsNotEmpty()
  @IsArray()
  topicIds: string[];

  @ApiProperty({ description: 'Image_URLs', example: 'WWW.img1.com' })
  @IsNotEmpty()
  @IsArray()
  imageUrls: string[];
}
