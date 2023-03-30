import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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
}

export class UpdateFormSwornDto extends PartialType(CreateFormSwornDto) {}
