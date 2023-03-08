import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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

  @IsString()
  readonly status: string = 'inactivo';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
