import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    const createdUser = await this.usersService.createUser(createUserDto);
    return createdUser;
  }
}
