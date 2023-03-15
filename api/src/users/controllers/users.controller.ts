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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(createUserDto);
    return createdUser;
  }

  @Get()
  async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return user;
  }

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

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userDelete = await this.usersService.deleteUser(id);
    if (!userDelete) {
      throw new NotFoundException(`user con ID ${id} no encontrado.`);
    }
    return 'Usuario eliminado';
  }
}
