import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DetachRequestDto {
  @IsNotEmpty()
  @IsString()
  questionId: string[];

  @IsNotEmpty()
  @IsArray()
  topicIds: string[];
}
