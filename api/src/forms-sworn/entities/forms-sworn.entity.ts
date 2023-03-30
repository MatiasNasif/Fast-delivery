import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FormSwornDocument = FormSworn & Document;

@Schema()
export class FormSworn {
  @Prop()
  alcohol: string;

  @Prop()
  medicines: string;

  @Prop()
  problems: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  user?: mongoose.Types.ObjectId;
}

export const FormSwornSchema = SchemaFactory.createForClass(FormSworn);
