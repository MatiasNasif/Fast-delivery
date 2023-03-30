import { Module } from '@nestjs/common';
import { FormSwornService } from './services/form-sworn.service';
import { FormSwornController } from './controllers/forms-sworn.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormSwornSchema } from './entities/forms-sworn.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'formsworm', schema: FormSwornSchema }]),
  ],
  providers: [FormSwornService],
  controllers: [FormSwornController],
  exports: [FormSwornService],
})
export class FormSwornModule {}
