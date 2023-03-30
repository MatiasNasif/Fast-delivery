import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FormSwornDocument = FormSworn & Document;

@Schema()
export class FormSworn {
  @Prop({ required: true })
  alcohol: string;

  @Prop({ required: true })
  medicines: string;

  @Prop({ required: true })
  problems: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  user: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FormSwornSchema = SchemaFactory.createForClass(FormSworn);
