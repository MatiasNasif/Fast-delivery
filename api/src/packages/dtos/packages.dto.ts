import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly receiver: string;

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @IsNotEmpty()
  @IsString()
  readonly deliveryDate: string;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsString()
  readonly deliveryStatus: string = 'pendiente';

  @IsOptional()
  user?: mongoose.Types.ObjectId;
}

export class UpdatePackageDto extends PartialType(CreatePackageDto) {}
