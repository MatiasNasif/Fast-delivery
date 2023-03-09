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
import { CreatePackageDto } from '../dtos/packages.dto';
import { PackagesService } from '../services/packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packageService: PackagesService) {}

  @Post('create')
  createPackage(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.createPackage(createPackageDto);
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

  @Delete('/:packageId')
  async deletePackage(@Param('packageId') packageId) {
    const deletePackage = await this.packageService.deletePackage(packageId);
    if (!deletePackage) throw new NotFoundException('Package does not exists');
    return { message: 'Package deleted succesfully' };
  }

  @Put('/:packageId')
  async updatePackage(
    @Body() createPackageDto: CreatePackageDto,
    @Param('packageId') packageId,
  ) {
    const updatePackage = await this.packageService.updatePackage(
      packageId,
      createPackageDto,
    );
    if (!updatePackage) throw new NotFoundException('Package does not exists');
    return updatePackage;
  }
}
