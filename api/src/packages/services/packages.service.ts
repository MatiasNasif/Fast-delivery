import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createPackage(
    createPackageDto: CreatePackageDto,
  ): Promise<CreatePackageDto> {
    if (createPackageDto.quantity > 100) {
      throw new BadRequestException(
        'La cantidad de paquetes creados no puede ser mayor a 100.',
      );
    }
    return this.packageModel.create(createPackageDto);
  }

  async getPackage(packageId: string): Promise<CreatePackageDto> {
    const pack = await this.packageModel.findById(packageId);
    return pack;
  }

  async getPackages(): Promise<CreatePackageDto[]> {
    const packages = await this.packageModel.find();
    return packages;
  }

  async deletePackage(packageId: string): Promise<CreatePackageDto> {
    const deletePackage = await this.packageModel.findByIdAndDelete(packageId);
    return deletePackage;
  }

  async updatePackage(
    packageId: string,
    createPackageDto: CreatePackageDto,
  ): Promise<CreatePackageDto> {
    const updatePackage = await this.packageModel.findByIdAndUpdate(
      packageId,
      createPackageDto,
      { new: true },
    );
    return updatePackage;
  }
}
