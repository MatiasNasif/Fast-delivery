import { Module } from '@nestjs/common';
import { UserModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from '../users/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { PackageSchema } from 'src/packages/entities/packages.entity';
import { PackagesModule } from 'src/packages/packages.module';
import { FormSwornSchema } from '../forms-sworn/entities/forms-sworn.entity';

@Module({
  imports: [
    UserModule,
    PackagesModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'package', schema: PackageSchema },
      { name: 'formsworn', schema: FormSwornSchema },
    ]),
  ],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, LocalStrategy],
})
export class AuthModule {}
