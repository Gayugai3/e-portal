// topic.service.ts

import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Topic } from './topics.schema';
import { CreateTopicDto } from 'src/use-cases/topics/create/create-topic.dto';

import { ObjectId } from 'mongodb';
import { QuestionService } from '../questions/questions.service';
import { UpdateTopicDto } from 'src/use-cases/topics/update/update-topic.dto';
@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<Topic>,
    @Inject(forwardRef(() => QuestionService))
    private questionService: QuestionService,
  ) {}

  async createTopic(createTopicDto: CreateTopicDto): Promise<Topic> {
    const createdTopic = new this.topicModel(createTopicDto);
    return createdTopic.save();
  }

  async getTopicsByIds(topicIds: string[]): Promise<Topic[]> {
    return this.topicModel.find({ _id: { $in: topicIds } }).exec();
  }

  async updateTopicsWithQuestion(
    topicIds: string[],
    questionId: string,
  ): Promise<void> {
    await this.topicModel
      .updateMany(
        { _id: { $in: topicIds } },
        { $push: { questionIds: questionId } },
      )
      .exec();
  }
  async getAllTopics(): Promise<Topic[]> {
    return this.topicModel.find().exec();
  }

  async updateQuestionIdInTopics(
    oldQuestionId: string[],
    newQuestionId: string,
  ): Promise<void> {
    try {
      const topics = await this.topicModel.find({ questionIds: oldQuestionId });

      if (topics.length > 0) {
        // Update all topics with the new questionId
        await this.topicModel
          .updateMany(
            { questionIds: oldQuestionId },
            { $set: { 'questionIds.$': newQuestionId } },
          )
          .exec();
      }
    } catch (error) {
      throw new Error(
        `Failed to update questionId in topics: ${error.message}`,
      );
    }
  }

  async removeQuestionFromTopics(questionId: string): Promise<void> {
    try {
      // Remove the question ID from all topics
      await this.topicModel.updateMany(
        { questionIds: questionId },
        { $pull: { questionIds: questionId } },
      );
    } catch (error) {
      // Handle errors as needed
      throw error;
    }
  }

  async detachQuestionFromTopics(
    topicIds: string[],
    questionId: string[],
  ): Promise<void> {
    try {
      // Update the topics by pulling the questionId from their questionIds array
      const result = await this.topicModel.updateMany(
        { _id: { $in: topicIds } },
        { $pull: { questionIds: { $in: questionId } } },
      );
    } catch (error) {
      console.error('Error updating topics:', error);
      throw error;
    }
  }

  async getTopicById(topicId: string): Promise<Topic | null> {
    try {
      const topic = await this.topicModel.findById(topicId).exec();
      if (!topic) {
        throw new NotFoundException(`Topic with ID ${topicId} not found`);
      }
      return topic;
    } catch (error) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }
  }

  async updateTopicQuestionIds(
    topicId: string,
    questionIds: string[],
  ): Promise<void> {
    await this.topicModel.findByIdAndUpdate(topicId, { questionIds }).exec();
  }

  async deleteTopic(topicId: string): Promise<void> {
    // Verify if the topic exists
    const topic = await this.topicModel.findById(topicId).exec();
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    // Delete the associated questions
    await this.questionService.deleteQuestionsByTopicId(topicId);

    // Delete the topic
    await this.topicModel.findByIdAndDelete(topicId).exec();
  }

  async updateTopic(
    topicId: string,
    updateTopicDto: UpdateTopicDto,
  ): Promise<void> {
    const { questionIds, ...otherUpdateFields } = updateTopicDto;

    // Verify if the topic exists
    const topic = await this.topicModel.findById(topicId).exec();
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    // Log or inspect the update fields
    console.log('Updating topic with fields:', otherUpdateFields);

    // Update the topic fields (excluding questionIds)
    Object.assign(topic, otherUpdateFields);


    // If new questionIds are provided, update the topic's questionIds
    if (questionIds && questionIds.length > 0) {
      // Ensure that we're not duplicating questionIds
      const uniqueQuestionIds = Array.from(
        new Set([...topic.questionIds, ...questionIds]),
      );

      // Set the updated questionIds
      topic.questionIds = uniqueQuestionIds;
    }

    // Save the changes
    await topic.save();

    // If new questionIds are provided, update questions
    if (questionIds && questionIds.length > 0) {
      await this.updateQuestionsWithTopic(topicId, questionIds);
    }
  }

  private async updateQuestionsWithTopic(
    topicId: string,
    questionIds: string[],
  ): Promise<void> {
    // Iterate through each questionId and update the question's topics
    for (const questionId of questionIds) {
      await this.questionService.addTopicToQuestion(questionId, topicId);
    }
  }
}
