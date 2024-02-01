// topic.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({ description: 'Topic Title', example: 'Topic 1' })
  @IsString()
  name: string;
}
