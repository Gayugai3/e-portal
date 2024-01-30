import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { signUpDto } from 'src/use-cases/user-auth/signup.dto';
import { User } from 'src/use-cases/user-auth/user.model';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/use-cases/user-auth/login.dto';

@Injectable()
export class UserAuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
      ) {}
    
      async signUp(signUpDto: signUpDto): Promise<{ token: string }> {
        const { name, email, password } = signUpDto;
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await this.userModel.create({
          name,
          email,
          password: hashedPassword,
        });
        const token = this.jwtService.sign({ id: user._id });
    
        return { token };
      }
    
      async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
    
        const user = await this.userModel.findOne({ email });
    
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatched) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const token = this.jwtService.sign({ id: user._id });
    
        return { token };
      }
}
