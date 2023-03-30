import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import mongoose from 'mongoose';

export class CreateFormSwornDto {
  @IsNotEmpty()
  @IsString()
  readonly alcohol: string;

  @IsNotEmpty()
  @IsEmail()
  readonly medicines: string;

  @IsNotEmpty()
  @IsString()
  readonly problems: string;

  readonly user?: mongoose.Types.ObjectId;
}

export class UpdateFormSwornDto extends PartialType(CreateFormSwornDto) {}
