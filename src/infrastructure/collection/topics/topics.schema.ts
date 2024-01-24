// topic.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Topic extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: String, ref: 'Question' }] })
  questionIds: string[]; // Array of Question IDs related to this topic
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
