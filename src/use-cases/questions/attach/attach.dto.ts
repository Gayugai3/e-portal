import { IsNotEmpty, IsString } from 'class-validator';

export class AttachRequestDto {
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @IsNotEmpty()
  @IsString()
  topicId: string;
}