import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateTopicDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  //   @IsOptional()
  //   @IsString()
  //   description?: string;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  questionIds?: string[];
}
