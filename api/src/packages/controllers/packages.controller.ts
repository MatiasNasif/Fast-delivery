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
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packageService: PackagesService) {}

  @ApiOperation({ summary: 'Crear paquete' })
  @ApiResponse({
    status: 201,
    description: 'El paquete fue creado exitosamente.',
    type: CreatePackageDto,
  })
  @ApiBadRequestResponse({ description: 'La data provista es inválida.' })
  @ApiBody({ type: CreatePackageDto })
  @Post('create')
  createPackage(@Body() createPackageDto: CreatePackageDto) {
    const newPackage = this.packageService.createPackage(createPackageDto);
    return newPackage;
  }

  @ApiOperation({ summary: 'Devolver todos los paquetes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los paquetes.',
    type: [CreatePackageDto],
  })
  @Get()
  async getPackages() {
    const packages = await this.packageService.getPackages();
    return packages;
  }

  @ApiOperation({ summary: 'Obtener todos los paquetes pendientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los paquetes pendientes en el sistema.',
    type: [CreatePackageDto],
  })
  @Get('/packagesPending')
  async getAllPackagesPending() {
    const packages = await this.packageService.getAllPackagesPending();
    return packages;
  }

  @ApiOperation({
    summary: 'Obtener todos los paquetes pendientes no asignados',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de todos los paquetes pendientes y no asignados en el sistema.',
    type: [CreatePackageDto],
  })
  @Get('/packagesPendingNotAssign')
  async getAllPackagesPendingNotAssign() {
    const packages = await this.packageService.getAllPackagesPendingNotAssign();
    return packages;
  }

  @ApiOperation({ summary: 'Obtener paquete por ID' })
  @ApiResponse({
    status: 200,
    description: 'El paquete correspondiente al ID especificado.',
    type: CreatePackageDto,
  })
  @ApiNotFoundResponse({ description: 'El paquete no existe.' })
  @ApiParam({ name: 'packageId', description: 'ID del paquete' })
  @Get('/:packageId')
  async getPackage(@Param('packageId') packageId) {
    const packageid = await this.packageService.getPackage(packageId);
    if (!packageid) throw new NotFoundException('Package does not exists');
    return packageid;
  }

  @ApiOperation({ summary: 'Obtener todos los paquetes por usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los paquetes correspondientes al usuario.',
    type: [CreatePackageDto],
  })
  @Get('/:userId/packagesByUser')
  async getAllPackagesByUser(@Param('userId') userId) {
    const packagesByUser = await this.packageService.getAllPackagesByUser(
      userId,
    );
    return packagesByUser;
  }

  @ApiOperation({
    summary: 'Obtener todos los paquetes pendientes por usuario',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de todos los paquetes pendientes correspondientes al usuario.',
    type: [CreatePackageDto],
  })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @Get('/:userId/packagesPendingByUser')
  async getAllPackagesPendingByUser(@Param('userId') userId) {
    const packagesPendingByUser =
      await this.packageService.getAllPackagesPendingByUser(userId);
    return packagesPendingByUser;
  }

  @ApiOperation({ summary: 'Obtener paquetes por fecha de entrega' })
  @ApiResponse({
    status: 200,
    description:
      'Lista de todos los paquetes correspondientes a la fecha de entrega especificada.',
    type: [CreatePackageDto],
  })
  @ApiNotFoundResponse({ description: 'No se encontraron paquetes.' })
  @ApiParam({ name: 'deliveryDate', description: 'fecha de entrega' })
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

  @ApiOperation({ summary: 'Actualizar un paquete' })
  @ApiResponse({
    status: 200,
    description: 'El paquete fue actualizado exitosamente.',
    type: UpdatePackageDto,
  })
  @ApiNotFoundResponse({ description: 'El paquete no existe.' })
  @ApiParam({ name: 'packageId', description: 'ID del paquete' })
  @Put('/:packageId')
  async packageId(
    @Param('packageId') packageId: string,
    @Body() updatePackage: UpdatePackageDto,
  ) {
    return this.packageService.updatePackage(packageId, updatePackage);
  }

  @ApiOperation({ summary: 'Eliminar un paquete' })
  @ApiResponse({
    status: 200,
    description: 'El paquete fue eliminado exitosamente.',
  })
  @ApiNotFoundResponse({ description: 'El paquete no existe.' })
  @ApiParam({ name: 'packageId', description: 'ID del paquete' })
  @Delete('/:packageId')
  async deletePackage(@Param('packageId') packageId) {
    const deletePackage = await this.packageService.deletePackage(packageId);
    if (!deletePackage) throw new NotFoundException('Package does not exists');
    return { message: 'Package deleted succesfully' };
  }
}
