export class FormSwornModule {}
import { Module } from '@nestjs/common';
import { FormSwornService } from './services/form-sworn.service';
import { FormSwornController } from './controllers/forms-sworn.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormSwornSchema } from './entities/forms-worn.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FormSworn', schema: FormSwornSchema }]),
  ],
  providers: [FormSwornService],
  controllers: [FormSwornController],
  exports: [FormSwornService],
})
export class FormSwornModule {}
