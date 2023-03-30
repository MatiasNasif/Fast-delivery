import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PackagesController } from './controllers/packages.controller';
import { PackageSchema } from './entities/packages.entity';
import { PackagesService } from './services/packages.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'package', schema: PackageSchema }]),
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
