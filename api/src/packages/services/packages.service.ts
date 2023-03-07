import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackageDocument } from '../entities/packages.entity.';
import { CreatePackageDto } from '../dtos/packages.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel('package')
    private readonly packageModel: Model<PackageDocument>,
  ) {}

  createPackage(createPackageDto: CreatePackageDto): Promise<CreatePackageDto> {
    return this.packageModel.create(createPackageDto);
  }
}
