import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsModule } from './use-cases/topics/topics.module';
import { QuestionsModule } from './use-cases/questions/questions.module';
import { UserAuthModule } from './use-cases/user-auth/user-auth.module';
import { TopicController } from './use-cases/topics/create/create.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    TopicsModule,
    QuestionsModule,
    UserAuthModule,
  ],
  controllers: [AppController, TopicController],
  providers: [AppService],
})
export class AppModule {}
