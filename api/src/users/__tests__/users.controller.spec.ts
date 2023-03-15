import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserModule } from '../users.module';
import { CreateUserDto } from '../dtos/user.dto';

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

  describe('users tests', () => {
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
  });
});
