import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackagesService } from './packages.service';
import { PackageDocument } from '../entities/packages.entity';
import { CreatePackageDto } from '../dtos/packages.dto';

interface CreatePackageDtoInterface extends CreatePackageDto {
  address: string;
  receiver: string;
  weight: number;
  deliveryDate: string;
  quantity: number;
  deliveryStatus: string;
  _id?: string;
}

describe('PackagesService', () => {
  let packagesService: PackagesService;
  let packageModel: Model<PackageDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackagesService,
        {
          provide: getModelToken('package'),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    packagesService = module.get<PackagesService>(PackagesService);
    packageModel = module.get<Model<PackageDocument>>(getModelToken('package'));
  });

  describe('createPackage', () => {
    it('should create a package and return the created package', async () => {
      const createPackageDto: CreatePackageDtoInterface = {
        address: 'Medrano 123',
        receiver: 'Tamara',
        weight: 8,
        deliveryDate: '2023-03-15',
        quantity: 3,
        deliveryStatus: 'pendiente',
      };

      const createPackage = createPackageDto;

      jest
        .spyOn(packageModel, 'create')
        .mockImplementation(() => Promise.resolve(createPackage));

      const result = await packagesService.createPackage(createPackageDto);

      expect(result).toEqual(createPackage);
      expect(packageModel.create).toHaveBeenCalledWith(createPackageDto);
    });
  });

  describe('getPackage', () => {
    it('should return the package with the given id', async () => {
      const packageId = '640ba09c0540c085fe77ac7f';

      const pack: CreatePackageDtoInterface = {
        _id: packageId,
        address: 'Medrano 123',
        receiver: 'Tamara',
        weight: 8,
        deliveryDate: '2023-03-15',
        quantity: 3,
        deliveryStatus: 'pendiente',
      };

      jest.spyOn(packageModel, 'findById').mockResolvedValue(pack);

      const result = await packagesService.getPackage(packageId);

      expect(result).toEqual(pack);
      expect(packageModel.findById).toHaveBeenCalledWith(packageId);
    });
  });

  describe('getPackages', () => {
    it('should return an array of packages', async () => {
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

      jest.spyOn(packageModel, 'find').mockResolvedValue(packages);

      const result = await packagesService.getPackages();

      expect(result).toEqual(packages);
      expect(packageModel.find).toHaveBeenCalled();
    });
  });

  describe('deletePackage', () => {
    it('should delete a package', async () => {
      const packageId = '640ba09c0540c085fe77ac7f';

      const packageDelete: CreatePackageDtoInterface = {
        _id: packageId,
        address: 'Medrano 123',
        receiver: 'Tamara',
        weight: 8,
        deliveryDate: '2023-03-15',
        quantity: 3,
        deliveryStatus: 'pendiente',
      };

      jest
        .spyOn(packageModel, 'findByIdAndDelete')
        .mockResolvedValue(packageDelete);

      const result = await packagesService.deletePackage(packageId);

      expect(result).toEqual(packageDelete);
      expect(packageModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });

  describe('updatePackage', () => {
    it('should update a package', async () => {
      const packageId = '640ba09c0540c085fe77ac7f';

      const updatePackage: CreatePackageDtoInterface = {
        _id: packageId,
        address: 'Medrano 123',
        receiver: 'Tamara',
        weight: 8,
        deliveryDate: '2023-03-15',
        quantity: 3,
        deliveryStatus: 'pendiente',
      };

      jest
        .spyOn(packageModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatePackage);

      const result = await packagesService.updatePackage(
        packageId,
        updatePackage,
      );

      expect(result).toEqual(updatePackage);
      expect(packageModel.findByIdAndUpdate).toHaveBeenCalledWith(
        packageId,
        updatePackage,
        { new: true },
      );
    });
  });
});
