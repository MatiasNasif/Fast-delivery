import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { PackageDocument } from 'src/packages/entities/packages.entity';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @InjectModel('package')
    private readonly packageModel: Model<PackageDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const userExists = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
      throw new BadRequestException(
        'Ya existe un usuario con el correo electrónico proporcionado.',
      );
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const createdUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async getUser(query: object): Promise<CreateUserDto> {
    return this.userModel.findOne(query);
  }

  async getAllNonAdminUsers(): Promise<CreateUserDto[]> {
    return this.userModel.find({ admin: false });
  }

  async getUserById(id: string): Promise<CreateUserDto> {
    const user: CreateUserDto = await this.userModel.findById(id);
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<CreateUserDto> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      {
        new: true,
      },
    );
    if (!updatedUser) {
      throw new NotFoundException(
        `Imposible actualizar, usuario con ID ${id} no encontrado.`,
      );
    }
    return updatedUser;
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async assignPackageToUser(
    userId: string,
    packs: string[],
  ): Promise<UpdateUserDto> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const existingPackageIds = user.packages.map((p) => p.toString());
    const newPackageIds = packs.filter(
      (id) => !existingPackageIds.includes(id),
    );
    if (newPackageIds.length !== packs.length) {
      const duplicatePackageIds = packs.filter((id) =>
        existingPackageIds.includes(id),
      );
      throw new NotFoundException(
        `Packages with ids ${duplicatePackageIds.join(
          ', ',
        )} are already assigned to user`,
      );
    }

    const packages = await this.packageModel
      .find({ _id: { $in: packs } })
      .exec();
    if (packages.length !== packs.length) {
      const missingPackageIds = packs.filter(
        (packageId) => !packages.some((p) => p._id.equals(packageId)),
      );
      throw new NotFoundException(
        `Packages with ids ${missingPackageIds.join(', ')} not found`,
      );
    }

    packages.map((pack) => {
      pack.user = new mongoose.Types.ObjectId(userId);
    });

    user.packages.push(new mongoose.Types.ObjectId(...packs));

    await user.save();

    for (const pack of packages) {
      await pack.save();
    }

    return user;
  }
}
