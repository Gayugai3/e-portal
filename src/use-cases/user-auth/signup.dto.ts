import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class signUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
