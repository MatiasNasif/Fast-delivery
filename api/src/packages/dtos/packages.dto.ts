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

  /* @IsNotEmpty() */
  @IsString()
  @IsOptional()
  readonly deliveryDate?: string;

  /* @IsNotEmpty() */
  @IsNumber()
  /* @IsOptional() */
  readonly quantity?: number;

  @IsString()
  @IsOptional()
  readonly deliveryStatus?: string = 'Pendiente';

  @IsOptional()
  user?: mongoose.Types.ObjectId;
}

export class UpdatePackageDto extends PartialType(CreatePackageDto) {}
