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

  @Delete('/:packageId')
  async deletePackage(@Param('packageId') packageId) {
    const deletePackage = await this.packageService.deletePackage(packageId);
    if (!deletePackage) throw new NotFoundException('Package does not exists');
    return { message: 'Package deleted succesfully' };
  }

  // @Put('/:packageId')
  // async updatePackage(
  //   @Body() createPackageDto: CreatePackageDto,
  //   @Body('userId') userId: string,
  //   @Param('packageId') packageId,
  // ) {
  //   const user = await this.usersService.getUserById(userId);
  //   const updatePackage = await this.packageService.updatePackage(
  //     packageId,
  //     createPackageDto,
  //   );
  //   if (!updatePackage) throw new NotFoundException('Package does not exists');
  //   user.packages.push(updatePackage);
  //   return updatePackage;
  // }
}
