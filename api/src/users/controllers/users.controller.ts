import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Crear usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Petición inválida' })
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(createUserDto);
    return createdUser;
  }

  @ApiOperation({ summary: 'Devolver todos los users delivery-man' })
  @ApiResponse({
    status: 201,
    description: 'Muestra todos los deliveryMan correctamente',
  })
  @ApiResponse({ status: 400, description: 'Petición inválida' })
  @Get('alldeliveryman')
  async getAllNonAdminUsers(): Promise<CreateUserDto[]> {
    return await this.usersService.getAllNonAdminUsers();
  }

  @ApiOperation({ summary: 'Devolver un user por ID' })
  @ApiResponse({
    status: 200,
    description: 'El usuario solicitado se muestra correctamente',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'El usuario ha sido actualizado correctamente',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userUpdate = await this.usersService.updateUser(id, updateUserDto);
    if (!userUpdate) {
      throw new NotFoundException(
        `Imposible actualizar, usuario con ID ${id} no encontrado.`,
      );
    }
    return userUpdate;
  }

  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userDelete = await this.usersService.deleteUser(id);
    if (!userDelete) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return 'Usuario eliminado';
  }

  @ApiOperation({ summary: 'Asignar paquetes a un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Los paquetes han sido asignados correctamente',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiBody({ type: [String] })
  @Post(':userId/assign')
  async assignPackageToUser(
    @Param('userId') userId: string,
    @Body('packs') packs: string[],
  ) {
    return this.usersService.assignPackageToUser(userId, packs);
  }
}
