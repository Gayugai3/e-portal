import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @ApiProperty({ description: 'Question', example: 'Question 1' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  question?: string;

  @ApiProperty({ description: 'answer', example: 'Answer 1' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  answer?: string;

  @ApiProperty({ description: 'Topic_IDs', example: '[Q_id]' })
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  topicIds?: string[];

  @ApiProperty({ description: 'Image_URLs', example: '[WWW.img1.com]' })
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  imageUrls?: string[];
}
