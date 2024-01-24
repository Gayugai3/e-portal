// question.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ type: [{ type: String, ref: 'Topic' }] })
  topicIds: string[]; 

  @Prop({ type: [{ type: String }] })
  imageUrls: string[]; 
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
