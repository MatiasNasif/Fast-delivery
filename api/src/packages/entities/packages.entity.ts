import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PackageDocument = Package & Document;

@Schema()
export class Package {
  @Prop()
  address: string;

  @Prop()
  receiver: string;

  @Prop()
  weight: number;

  @Prop()
  deliveryDate: string;

  @Prop()
  quantity: number;

  @Prop({ enum: ['Entregado', 'En curso', 'Pendiente'] })
  deliveryStatus: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null })
  user?: mongoose.Types.ObjectId;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
