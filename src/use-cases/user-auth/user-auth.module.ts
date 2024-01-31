import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UserAuthService } from 'src/infrastructure/collection/user-auth/user-auth.service';
import { JwtStrategy } from 'src/common/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_Secret'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserAuthModule {}
