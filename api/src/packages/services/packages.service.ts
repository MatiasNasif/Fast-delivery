import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackageDocument } from '../entities/packages.entity';
import { CreatePackageDto, UpdatePackageDto } from '../dtos/packages.dto';
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

  async getAllPackagesByUser(userId: string): Promise<CreatePackageDto[]> {
    const userExists = await this.userModel.findById(userId);
    if (!userExists) {
      throw new NotFoundException('No existe el usuario en la base de datos');
    }

    const packagesByUser = await this.packageModel.find({
      user: userId,
      deliveryStatus: { $in: ['Entregado', 'En curso'] },
    });
    return packagesByUser;
  }

  async getAllPackagesPending(): Promise<CreatePackageDto[]> {
    const packages = await this.packageModel.find({
      deliveryStatus: 'Pendiente',
    });
    return packages;
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

  async findByDeliveryDate(
    deliveryDateString: string,
  ): Promise<CreatePackageDto[]> {
    const deliveryDate = deliveryDateString.replace(/-/g, '/');
    const packagesByDate = await this.packageModel
      .find({
        deliveryDate: deliveryDate,
      })
      .exec();

    return packagesByDate;
  }

  async deletePackage(packageId: string): Promise<CreatePackageDto> {
    const deletePackage = await this.packageModel.findByIdAndDelete(packageId);
    return deletePackage;
  }

  async updatePackage(
    packageId: string,
    updatePackageDto: UpdatePackageDto,
  ): Promise<UpdatePackageDto> {
    const updatedPackage = await this.packageModel.findByIdAndUpdate(
      packageId,
      updatePackageDto,
      { new: true },
    );
    return updatedPackage;
  }
}
