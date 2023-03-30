import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Package } from '../../packages/entities/packages.entity';

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

  @Prop({ enum: ['Activo', 'Inactivo'] })
  status: string;

  @Prop({ enum: ['Viaje en Curso', 'Finalizó'] })
  statusWorkday: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Package' })
  packages: Array<Package>;
}

export const UserSchema = SchemaFactory.createForClass(User);
