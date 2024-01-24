import { Module, forwardRef } from '@nestjs/common';
import { QuestionController } from './create/create.controller';
import { GetController } from './get/get.controller';
import { GetByIdController } from './get-by-id/get-by-id.controller';
import { UpdateController } from './update/update.controller';
import { DeleteController } from './delete/delete.controller';
import { QuestionService } from 'src/infrastructure/collection/questions/questions.service';
import {
  Question,
  QuestionSchema,
} from 'src/infrastructure/collection/questions/questions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsModule } from '../topics/topics.module';
import { GetallByTopicController } from './getall-by-topic/getall-by-topic.controller';
import { DetachController } from './detach/detach.controller';
import { AttachController } from './attach/attach.controller';
import {
  Topic,
  TopicSchema,
} from 'src/infrastructure/collection/topics/topics.schema';
import { TopicService } from './../../infrastructure/collection/topics/topics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Topic.name, schema: TopicSchema },
    ]),
    TopicsModule,
  ],
  controllers: [
    QuestionController,
    GetController,
    GetByIdController,
    UpdateController,
    DeleteController,
    GetallByTopicController,
    DetachController,
    AttachController,
  ],
  providers: [QuestionService, TopicService],
  exports: [QuestionService, MongooseModule],
})
export class QuestionsModule {}
