import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UsersService } from '../services/users.service';
import { UserDocument } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

interface CreateUserDtoWithId extends CreateUserDto {
  _id?: ObjectId | string;
}

describe('UsersService', () => {
  let usersService: UsersService;
  let UserModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('user'),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    UserModel = module.get<Model<UserDocument>>(getModelToken('user'));
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDtoWithId: CreateUserDtoWithId = {
        fullName: 'Edgar Lagos',
        email: 'edgar@mail.com',
        password: 'secret',
        admin: false,
        status: 'inactivo',
      };
      const expectedUser: User = {
        fullName: createUserDtoWithId.fullName,
        email: createUserDtoWithId.email,
        password: createUserDtoWithId.password,
        admin: createUserDtoWithId.admin,
        status: createUserDtoWithId.status,
      };
      jest.spyOn(usersService, 'createUser').mockResolvedValue(expectedUser);
      expect(await usersService.createUser(createUserDtoWithId)).toEqual(
        expectedUser,
      );
      expect(usersService.createUser).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if email already exists', async () => {
      const createUserDtoWithId: CreateUserDtoWithId = {
        fullName: 'Edgar Lagos',
        email: 'edgar@mail.com',
        password: 'secret',
        admin: false,
        status: 'inactivo',
        _id: 'random-id',
      };
      jest.spyOn(UserModel, 'findOne').mockResolvedValue({
        _id: 'id',
        email: 'edgar@mail.com',
      });

      await expect(
        usersService.createUser(createUserDtoWithId),
      ).rejects.toThrowError(
        new BadRequestException(
          'Ya existe un usuario con el correo electrónico proporcionado.',
        ),
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          fullName: 'Fabian',
          email: 'fabian@mail.com',
          password: 'bDcVMzdd',
          admin: false,
          status: 'inactivo',
        },
        {
          fullName: 'Matias',
          email: 'matias@mail.com',
          password: 'sdgVMzdd',
          admin: true,
          status: 'activo',
        },
      ];
      jest.spyOn(UserModel, 'find').mockResolvedValue(users);
      const result = await usersService.getAllUsers();
      expect(result).toEqual(users);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      const existingUser: User = {
        fullName: 'Edgar Lagos',
        email: 'edgar@mail.com',
        password: 'secret',
        admin: false,
        status: 'inactivo',
      };
      jest.spyOn(UserModel, 'findById').mockResolvedValue(existingUser);
      const existingUserId = '1';
      const result = await usersService.getUserById(existingUserId);
      expect(result).toEqual(existingUser);
      expect(UserModel.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updatedUser: User = {
        fullName: 'Julieta Kopp',
        email: 'julieta@mail.com',
        password: 'secret',
        admin: false,
        status: 'activo',
      };
      jest.spyOn(UserModel, 'findOneAndUpdate').mockResolvedValue(updatedUser);
      const user = await usersService.updateUser('1', updatedUser);
      expect(user).toEqual(updatedUser);
      expect(UserModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException for non-existing user', async () => {
      const nonExistingUserId: CreateUserDtoWithId = {
        fullName: 'Julieta Kopp',
        email: 'julieta@mail.com',
        password: 'secret',
        admin: false,
        status: 'activo',
        _id: 'random-id',
      };
      jest.spyOn(UserModel, 'findOneAndUpdate').mockResolvedValue(null);
      await expect(
        usersService.updateUser('2', nonExistingUserId),
      ).rejects.toThrowError(
        new NotFoundException(
          `Imposible actualizar, usuario con ID 2 no encontrado.`,
        ),
      );
    });
    it('should throw an error if the updated user has invalid fields', async () => {
      const invalidUser: any = {
        fullName: 123,
        email: 'julieta@mail.com',
        password: 'secret',
        admin: false,
        status: 'activo',
      };
      await expect(usersService.updateUser('1', invalidUser)).rejects.toThrow();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully and return true', async () => {
      jest.spyOn(UserModel, 'findByIdAndDelete').mockResolvedValue(true);
      const result = await usersService.deleteUser('124');
      expect(result).toBe(true);
      expect(UserModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  });
});
