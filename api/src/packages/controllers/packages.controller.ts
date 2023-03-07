import { Body, Controller, Post } from '@nestjs/common';
import { CreatePackageDto } from '../dtos/packages.dto';
import { PackagesService } from '../services/packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packageService: PackagesService) {}

  @Post('create')
  createPackage(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.createPackage(createPackageDto);
  }
}
