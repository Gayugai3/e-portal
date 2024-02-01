import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class signUpDto {
  @ApiProperty({ description: 'Name', example: 'John Roe' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Email', example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @ApiProperty({ description: 'Password', example: '123456' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
