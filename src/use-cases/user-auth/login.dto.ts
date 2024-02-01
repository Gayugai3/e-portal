import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email', example: 'john@gmail.com' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @ApiProperty({ description: 'Password', example: '123456' })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
