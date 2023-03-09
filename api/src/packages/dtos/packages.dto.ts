import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}

export class UpdatePackageDto extends PartialType(CreatePackageDto) {}
