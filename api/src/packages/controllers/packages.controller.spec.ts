import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePackageDto } from '../dtos/packages.dto';
import { PackagesModule } from '../packages.module';
import { PackagesService } from '../services/packages.service';
import { PackagesController } from './packages.controller';

interface CreatePackageDtoInterface extends CreatePackageDto {
  address: string;
  receiver: string;
  weight: number;
  deliveryDate: string;
  quantity: number;
  deliveryStatus: string;
  _id?: string;
}

describe('PackagesController', () => {
  let controller: PackagesController;
  let service: PackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PackagesModule],
    })
      .overrideProvider(getModelToken('package'))
      .useValue(jest.fn())
      .compile();

    controller = module.get<PackagesController>(PackagesController);
    service = module.get<PackagesService>(PackagesService);
  });

  describe('createPackage', () => {
    it('should create a package', async () => {
      const createPackageDto: CreatePackageDtoInterface = {
        address: 'Medrano 123',
        receiver: 'Tamara',
        weight: 8,
        deliveryDate: '2023-03-15',
        quantity: 3,
        deliveryStatus: 'pendiente',
      };

      jest.spyOn(service, 'createPackage').mockResolvedValue(createPackageDto);
      expect(await controller.createPackage(createPackageDto)).toBe(
        createPackageDto,
      );
    });
  });

  describe('getPackage', () => {
    it('should get a package by id', async () => {
      const pack: CreatePackageDtoInterface = {
        _id: '6414b8',
        address: 'Medrano 123',
        receiver: 'Tamara',
        weight: 8,
        deliveryDate: '2023-03-15',
        quantity: 3,
        deliveryStatus: 'pendiente',
      };

      jest.spyOn(service, 'getPackage').mockResolvedValue(pack);

      expect(await controller.getPackage('6414b8')).toBe(pack);
    });
    it('should throw NotFoundException if package does not exist', async () => {
      jest.spyOn(service, 'getPackage').mockResolvedValue(null);
      await expect(controller.getPackage('6414b8')).rejects.toThrowError(
        new NotFoundException('Package does not exists'),
      );
    });
  });

  describe('getPackages', () => {
    it('should return all packages', async () => {
      const packages: CreatePackageDtoInterface[] = [
        {
          _id: '640ba09c0540c085fe77ac7f',
          address: 'Medrano 123',
          receiver: 'Tamara',
          weight: 8,
          deliveryDate: '2023-03-15',
          quantity: 3,
          deliveryStatus: 'pendiente',
        },
        {
          _id: '640ba09c0540c085fe77ac7g',
          address: 'Rivadavia 123',
          receiver: 'Paola',
          weight: 5,
          deliveryDate: '2023-03-18',
          quantity: 2,
          deliveryStatus: 'pendiente',
        },
      ];

      jest.spyOn(service, 'getPackages').mockResolvedValue(packages);

      expect(await controller.getPackages()).toBe(packages);
    });
  });

  describe('deletePackage', () => {
    it('should delete a package', async () => {
      const packageDelete: CreatePackageDtoInterface = {
        _id: '645984',
        address: 'Medrano 123',
        receiver: 'Tamara',
        weight: 8,
        deliveryDate: '2023-03-15',
        quantity: 3,
        deliveryStatus: 'pendiente',
      };

      jest.spyOn(service, 'deletePackage').mockResolvedValue(packageDelete);

      const result = { message: 'Package deleted succesfully' };

      expect(await controller.deletePackage(packageDelete._id)).toEqual(result);
    });

    it('should throw NotFoundException if package does not exist', async () => {
      const packageId = '1230';

      jest.spyOn(service, 'deletePackage').mockResolvedValue(null);

      await expect(controller.deletePackage(packageId)).rejects.toThrowError(
        new NotFoundException('Package does not exists'),
      );
      expect(service.deletePackage).toHaveBeenCalledWith(packageId);
    });
  });

  describe('updatePackage', () => {
    it('should update a package', async () => {
      const updatePackage: CreatePackageDtoInterface = {
        _id: '645984',
        address: 'Medrano 123',
        receiver: 'Tamara',
        weight: 8,
        deliveryDate: '2023-03-15',
        quantity: 3,
        deliveryStatus: 'pendiente',
      };

      jest.spyOn(service, 'updatePackage').mockResolvedValue(updatePackage);

      const result = await controller.updatePackage(
        updatePackage,
        updatePackage._id,
      );

      expect(service.updatePackage).toHaveBeenCalledWith(
        updatePackage._id,
        updatePackage,
      );
      expect(result).toEqual(updatePackage);
    });
  });
});
