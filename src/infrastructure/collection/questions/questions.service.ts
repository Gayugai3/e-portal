// question.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './questions.schema';
import { TopicService } from '../topics/topics.service';
import { CreateQuestionDto } from 'src/use-cases/questions/create/create-question.dto';
import { UpdateQuestionDto } from 'src/use-cases/questions/update/update-question.dto';
import { DetachRequestDto } from 'src/use-cases/questions/detach/detach-request.dto';
import { Topic } from '../topics/topics.schema';
import { AttachRequestDto } from 'src/use-cases/questions/attach/attach.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    private topicService: TopicService,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    // Retrieve all topics at once
    const topics = await this.topicService.getTopicsByIds(
      createQuestionDto.topicIds,
    );

    // Check if all specified topics exist
    const missingTopics = createQuestionDto.topicIds.filter(
      (topicId) => !topics.some((t) => t.id === topicId),
    );

    if (missingTopics.length > 0) {
      throw new NotFoundException(
        `Topics with IDs ${missingTopics.join(', ')} not found`,
      );
    }

    // If all topics exist, proceed to create the question
    const createdQuestion = new this.questionModel(createQuestionDto);
    const savedQuestion = await createdQuestion.save();

    // Update topics with the new question in bulk
    await this.topicService.updateTopicsWithQuestion(
      createQuestionDto.topicIds,
      savedQuestion._id,
    );

    return savedQuestion;
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async getQuestionById(questionId: string): Promise<Question> {
    try {
      const question = await this.questionModel.findById(questionId).exec();
      if (!question) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }
      return question;
    } catch (error) {
      throw error;
    }
  }

  async updateQuestion(
    questionId: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    try {
      const existingQuestion = await this.questionModel.findById(questionId);

      if (!existingQuestion) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }

      // Check if topicIds is being updated
      if (
        updateQuestionDto.topicIds &&
        JSON.stringify(updateQuestionDto.topicIds) !==
          JSON.stringify(existingQuestion.topicIds)
      ) {
        // Update topic collection
        await this.topicService.updateQuestionIdInTopics(
          existingQuestion.topicIds,
          questionId,
        );
      }

      // Update the question
      Object.assign(existingQuestion, updateQuestionDto);
      const updatedQuestion = await existingQuestion.save();

      return updatedQuestion;
    } catch (error) {
      throw new Error(`Failed to update question: ${error.message}`);
    }
  }

  async deleteQuestion(questionId: string): Promise<void> {
    try {
      // Find the question by ID
      const question = await this.questionModel.findById(questionId);
      if (!question) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }

      // Remove the question ID from associated topics
      await this.topicService.removeQuestionFromTopics(questionId);

      // Delete the question
      await this.questionModel.findByIdAndDelete(questionId);
    } catch (error) {
      // Handle errors as needed
      throw error;
    }
  }

  async getQuestionsByTopic(topicId: string): Promise<Question[]> {
    try {
      if (!topicId) {
        throw new BadRequestException('Topic ID is required');
      }

      // Implement your logic to retrieve questions for the specified topic
      const questions = await this.questionModel
        .find({ topicIds: topicId })
        .exec();

      if (!questions || questions.length === 0) {
        throw new NotFoundException(
          `No questions found for topic with ID ${topicId}`,
        );
      }

      return questions;
    } catch (error) {
      throw error;
    }
  }

  async detachQuestion(detachRequestDto: DetachRequestDto): Promise<void> {
    const { questionId, topicIds } = detachRequestDto;
    // Verify if the question exists
    const question = await this.questionModel.findById(questionId).exec();
    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    // Update the question by removing the specified topicIds
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(
      questionId,
      { $pull: { topicIds: { $in: topicIds } } },
      { new: true }, // Return the updated document
    );
    // Verify if the question was updated successfully
    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    // Update the specified topics by removing the questionId from their questionIds array
    await this.topicService.detachQuestionFromTopics(topicIds, questionId);
  }

  async attachQuestion(attachRequestDto: AttachRequestDto): Promise<void> {
    const { questionId, topicId } = attachRequestDto;

    // Verify if the question and topic exist
    const question = await this.questionModel.findById(questionId).exec();
    const topic = await this.topicService.getTopicById(topicId);

    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    // Attach the question to the specified topic
    if (!topic.questionIds.includes(questionId)) {
      topic.questionIds.push(questionId);
      await topic.save();
    }

    // Update the question with the topicId
    if (!question.topicIds.includes(topicId)) {
      question.topicIds.push(topicId);
      await question.save();
    }

    // Update the topic in the database with the modified questionIds array
    await this.topicService.updateTopicQuestionIds(topicId, topic.questionIds);
  }

  // async deleteQuestionsByTopicId(topicId: string): Promise<void> {
  //   // Update questions to remove the specified topicId from the topicIds array
  //   await this.questionModel
  //     .updateMany(
  //       { topicIds: { $in: [topicId] } },
  //       { $pull: { topicIds: topicId } },
  //     )
  //     .exec();
  // }
}
