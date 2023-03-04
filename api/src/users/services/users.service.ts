import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const createdUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser;
  }

  async getUser(query: object): Promise<CreateUserDto> {
    return this.userModel.findOne(query);
  }
}
