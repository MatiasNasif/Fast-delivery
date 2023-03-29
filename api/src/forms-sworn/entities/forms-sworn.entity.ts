import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FormswornDocument = Formsworn & Document;

@Schema()
export class Formsworn {
  @Prop()
  alcohol: string;

  @Prop()
  medicines: string;

  @Prop()
  problems: string;
}

export const FormswornSchema = SchemaFactory.createForClass(Formsworn);
