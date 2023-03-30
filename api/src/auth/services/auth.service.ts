import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<CreateUserDto> {
    const user = await this.usersService.getUser({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid password');
    return user;
  }

  async login(user: CreateUserDto) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
    };
  }

  async logout(user: CreateUserDto) {
    return { access_token: null, msg: 'The user session has ended', user };
  }
}
