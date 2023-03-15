import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserModule } from '../users.module';
import { CreateUserDto } from '../dtos/user.dto';
import { NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongoose';

interface CreateUserDtoWithAdditionalProps extends CreateUserDto {
  _id?: ObjectId | string;
}

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getModelToken('user'))
      .useValue(jest.fn())
      .compile();

    userService = module.get<UsersService>(UsersService);
    userController = module.get<UsersController>(UsersController);
  });

  describe('get all users', () => {
    it('should return all users', async () => {
      const users: CreateUserDto[] = [
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
      jest
        .spyOn(userService, 'getAllUsers')
        .mockImplementation(() => Promise.resolve(users));

      expect(await userController.getAllUsers()).toBe(users);
      expect(await userService.getAllUsers).toHaveBeenCalledTimes(1);
    });

    describe('create user', () => {
      it('should create a new user', async () => {
        const createUserDto: CreateUserDtoWithAdditionalProps = {
          fullName: 'Edgar Lagos',
          email: 'edgar@mail.com',
          password: 'secret',
          admin: false,
          status: 'inactivo',
        };
        jest.spyOn(userService, 'createUser').mockResolvedValue(createUserDto);
        expect(await userController.createUser(createUserDto)).toBe(
          createUserDto,
        );
      });
    });

    describe('get user by ID', () => {
      it('should return a user by id', async () => {
        const user: CreateUserDtoWithAdditionalProps = {
          fullName: 'Edgar Lagos',
          email: 'edgar@mail.com',
          password: 'secret',
          admin: false,
          status: 'inactivo',
        };
        jest.spyOn(userService, 'updateUser').mockResolvedValue(user);
        expect(await userController.updateUser('1', user)).toBe(user);
      });

      it('should throw a NotFoundException for non-existing user', async () => {
        jest.spyOn(userService, 'getUserById').mockResolvedValue(null);
        await expect(userController.getUserById('1')).rejects.toThrowError(
          new NotFoundException('user con ID 1 no encontrado.'),
        );
      });
    });

    describe('update user', () => {
      it('should update a user by id', async () => {
        const updateUserDto: CreateUserDtoWithAdditionalProps = {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          password: 'new-secret',
          admin: false,
          status: 'inactivo',
        };
        jest.spyOn(userService, 'updateUser').mockResolvedValue(updateUserDto);
        expect(await userController.updateUser('1', updateUserDto)).toBe(
          updateUserDto,
        );
      });

      it('should throw a NotFoundException for non-existing user', async () => {
        const updateUserDto: CreateUserDtoWithAdditionalProps = {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          password: 'new-secret',
          admin: false,
          status: 'inactivo',
        };
        jest.spyOn(userService, 'updateUser').mockResolvedValue(null);
        await expect(
          userController.updateUser('1', updateUserDto),
        ).rejects.toThrowError(
          new NotFoundException(
            'Imposible actualizar, usuario con ID 1 no encontrado.',
          ),
        );
      });

      describe('delete user', () => {
        it('should delete a user by id', async () => {
          const deletedUser: any = {
            _id: '1',
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            password: 'secret',
            admin: false,
            status: 'inactivo',
          };
          jest.spyOn(userService, 'deleteUser').mockResolvedValue(deletedUser);

          const result = await userController.deleteUser(deletedUser._id);
          expect(result).toEqual('Usuario eliminado');
          expect(userService.deleteUser).toHaveBeenCalledWith(deletedUser._id);
        });

        it('should throw a NotFoundException for non-existing user', async () => {
          const nonExistingUserId = '1254';
          jest.spyOn(userService, 'deleteUser').mockResolvedValue(null);

          await expect(
            userController.deleteUser(nonExistingUserId),
          ).rejects.toThrowError(
            new NotFoundException(
              `user con ID ${nonExistingUserId} no encontrado.`,
            ),
          );
          expect(userService.deleteUser).toHaveBeenCalledWith(
            nonExistingUserId,
          );
        });
      });
    });
  });
});
