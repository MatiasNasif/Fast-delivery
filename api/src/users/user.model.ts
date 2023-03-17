import * as mongoose from 'mongoose';
import { User } from './entities/user.entity';

export interface UserModel extends User, mongoose.Document {}

export const UserSchema = mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  admin: { type: Boolean, default: false },
  status: { type: String, default: 'inactivo' },
});

export const UserModel = mongoose.model<UserModel>('User', UserSchema);
