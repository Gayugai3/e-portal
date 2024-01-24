import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
  ],
  controllers: [
    TopicController,
    GetController,
    GetByIdController,
    UpdateController,
    DeleteController,
  ],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicsModule {}
