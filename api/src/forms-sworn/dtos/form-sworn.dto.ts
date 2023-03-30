import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import mongoose from 'mongoose';

export class CreateFormSwornDto {
  @IsNotEmpty()
  @IsString()
  readonly alcohol: string;

  @IsNotEmpty()
  @IsString()
  readonly medicines: string;

  @IsNotEmpty()
  @IsString()
  readonly problems: string;

  readonly user: mongoose.Types.ObjectId;

  readonly createdAt: Date;
}

export class UpdateFormSwornDto extends PartialType(CreateFormSwornDto) {}
