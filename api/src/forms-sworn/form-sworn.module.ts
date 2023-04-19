import { Module } from '@nestjs/common';
import { FormSwornService } from './services/form-sworn.service';
import { FormSwornController } from './controllers/forms-sworn.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormSwornSchema } from './entities/forms-sworn.entity';
import { UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'formsworn', schema: FormSwornSchema }]),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],

  controllers: [FormSwornController],
  providers: [FormSwornService],
  exports: [FormSwornService],
})
export class FormSwornModule {}
