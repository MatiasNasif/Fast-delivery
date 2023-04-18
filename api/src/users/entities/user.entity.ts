import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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

  @Prop({ enum: ['Activo', 'Inactivo'], default: 'Activo' })
  status?: string;

  @Prop({ enum: ['Viaje en Curso', 'Finalizó'] })
  statusWorkday?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'package' }],
    default: [],
  })
  packages?: mongoose.Types.ObjectId[];

  @Prop()
  photo?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
