import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackageDocument } from '../entities/packages.entity';
import { CreatePackageDto } from '../dtos/packages.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel('package')
    private readonly packageModel: Model<PackageDocument>,
    @InjectModel('user')
    private readonly userModel: Model<UserDocument>,
  ) {}

  createPackage(createPackageDto: CreatePackageDto): Promise<CreatePackageDto> {
    return this.packageModel.create(createPackageDto);
  }

  async getPackage(packageId: string): Promise<CreatePackageDto> {
    const product = await this.packageModel.findById(packageId);
    return product;
  }

  async getPackages(): Promise<CreatePackageDto[]> {
    const packages = await this.packageModel.find();
    return packages;
  }

  async getAllPackagesByUser(userId: string): Promise<CreatePackageDto[]> {
    const userExists = await this.userModel.findById(userId);
    if (!userExists) {
      throw new NotFoundException('No existe el usuario en la base de datos');
    }

    const packagesByUser = await this.packageModel.find({ user: userId });
    return packagesByUser;
  }

  async getAllPackagesPendingByUser(
    userId: string,
  ): Promise<CreatePackageDto[]> {
    const userExists = await this.userModel.findById(userId);
    if (!userExists) {
      throw new NotFoundException('No existe el usuario en la base de datos');
    }

    const packagesPendingByUser = await this.packageModel.find({
      deliveryStatus: 'Pendiente',
      user: userId,
    });
    return packagesPendingByUser;
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
