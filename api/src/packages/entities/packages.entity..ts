import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ default: 'pendiente' })
  deliveryStatus: string;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
