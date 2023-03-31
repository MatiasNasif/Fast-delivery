import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePackageDto } from '../dtos/packages.dto';
import { PackagesService } from '../services/packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packageService: PackagesService) {}

  @Post('create')
  createPackage(@Body() createPackageDto: CreatePackageDto) {
    const newPackage = this.packageService.createPackage(createPackageDto);
    return newPackage;
  }

  @Get()
  async getPackages() {
    const packages = await this.packageService.getPackages();
    return packages;
  }

  @Get('/:packageId')
  async getPackage(@Param('packageId') packageId) {
    const packageid = await this.packageService.getPackage(packageId);
    if (!packageid) throw new NotFoundException('Package does not exists');
    return packageid;
  }

  @Get('/:userId/packagesByUser')
  async getAllPackagesByUser(@Param('userId') userId) {
    const packagesByUser = await this.packageService.getAllPackagesByUser(
      userId,
    );
    return packagesByUser;
  }

  @Get('/:userId/packagesPendingByUser')
  async getAllPackagesPendingByUser(@Param('userId') userId) {
    const packagesPendingByUser =
      await this.packageService.getAllPackagesPendingByUser(userId);
    return packagesPendingByUser;
  }

  @Delete('/:packageId')
  async deletePackage(@Param('packageId') packageId) {
    const deletePackage = await this.packageService.deletePackage(packageId);
    if (!deletePackage) throw new NotFoundException('Package does not exists');
    return { message: 'Package deleted succesfully' };
  }
}
