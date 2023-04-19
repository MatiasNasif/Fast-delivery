import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { UserModule } from '../../users/users.module';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AuthModule],
    })
      .overrideProvider(getModelToken('user'))
      .useValue(jest.fn())
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return access token with valid user', async () => {
      const mockUser = {
        email: 'test@test.com',
        password: 'password',
        fullName: 'matias',
        admin: false,
        status: 'inactivo',
      };
      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(async () => mockUser);
      const result = await authController.login({ user: mockUser });
      expect(result.access_token).toBeDefined();
    });

    // it('should throw UnauthorizedException with invalid user', async () => {
    //   jest
    //     .spyOn(authService, 'validateUser')
    //     .mockImplementation(async () => null);
    //   await expect(
    //     authController.login({
    //       user: { email: 'test2@test.com', password: 'password2' },
    //     }),
    //   ).rejects.toThrow(new UnauthorizedException('Invalid credentials'));
    // });
  });

  describe('logout', () => {
    it('should return access token as null', async () => {
      const mockUser = { email: 'test@test.com', password: 'password' };
      const result = await authController.logout({ user: mockUser });
      expect(result.access_token).toBeNull();
    });
  });
});
