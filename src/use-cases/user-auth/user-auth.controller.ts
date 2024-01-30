import { Body, Controller, Get, Post } from '@nestjs/common';
import { signUpDto } from './signup.dto';
import { LoginDto } from './login.dto';
import { UserAuthService } from 'src/infrastructure/collection/user-auth/user-auth.service';

@Controller('auth')
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: signUpDto): Promise<{ token: string }> {
    return this.userAuthService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.userAuthService.login(loginDto);
  }
}
