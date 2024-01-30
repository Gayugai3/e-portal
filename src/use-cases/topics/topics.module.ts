import { Module, forwardRef } from '@nestjs/common';
import { TopicController } from './create/create.controller';
import { GetController } from './get/get.controller';
import { GetByIdController } from './get-by-id/get-by-id.controller';
import { UpdateController } from './update/update.controller';
import { DeleteController } from './delete/delete.controller';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from '../questions/questions.module';
import {
  Topic,
  TopicSchema,
} from 'src/infrastructure/collection/topics/topics.schema';
import { TopicService } from 'src/infrastructure/collection/topics/topics.service';
import { UserAuthModule } from '../user-auth/user-auth.module';
import {
  Question,
  QuestionSchema,
} from 'src/infrastructure/collection/questions/questions.schema';

@Module({
  imports: [
    forwardRef(() => UserAuthModule),
    MongooseModule.forFeature([
      { name: Topic.name, schema: TopicSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
    // QuestionsModule,
    // forwardRef(() => QuestionsModule),
  ],
  controllers: [
    TopicController,
    GetController,
    GetByIdController,
    UpdateController,
    DeleteController,
  ],
  providers: [TopicService],
  // providers: [TopicService],
  exports: [TopicService, MongooseModule],
})
export class TopicsModule {}
