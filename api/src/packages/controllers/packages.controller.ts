import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePackageDto, UpdatePackageDto } from '../dtos/packages.dto';
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

  @Get('/packagesPending')
  async getAllPackagesPending() {
    const packages = await this.packageService.getAllPackagesPending();
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

  @Get(':deliveryDate/delivery-date')
  async findByDeliveryDate(@Param('deliveryDate') deliveryDateString: string) {
    const packages = await this.packageService.findByDeliveryDate(
      deliveryDateString,
    );
    if (!packages.length) {
      throw new NotFoundException(
        `No se encontraron paquetes para la fecha de entrega ${deliveryDateString}`,
      );
    }
    return packages;
  }

  @Put('/:packageId')
  async packageId(
    @Param('packageId') packageId: string,
    @Body() updatePackage: UpdatePackageDto,
  ) {
    return this.packageService.updatePackage(packageId, updatePackage);
  }

  @Delete('/:packageId')
  async deletePackage(@Param('packageId') packageId) {
    const deletePackage = await this.packageService.deletePackage(packageId);
    if (!deletePackage) throw new NotFoundException('Package does not exists');
    return { message: 'Package deleted succesfully' };
  }
}
