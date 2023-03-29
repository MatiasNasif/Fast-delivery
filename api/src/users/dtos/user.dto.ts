import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import mongoose from 'mongoose';

export class CreateUserDto {
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsBoolean()
  readonly admin: boolean = false;

  @IsEnum(['Activo', 'Inactivo'])
  readonly status: string;

  @IsOptional()
  packages?: mongoose.Types.ObjectId[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
