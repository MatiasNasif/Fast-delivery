import * as mongoose from 'mongoose';
import { Formsworn } from './entities/formsworn.entity';

export interface FormswornModel extends Formsworn, mongoose.Document {}

export const FormswornSchema = mongoose.Schema({
  alcohol: { type: String },
  medicines: { type: String },
  problems: { type: String },
});

export const FormswornModel = mongoose.model<FormswornModel>(
  'Formsworn',
  FormswornSchema,
);
