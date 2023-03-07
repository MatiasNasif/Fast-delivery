import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  admin: boolean;

  @Prop({ default: 'inactivo' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
