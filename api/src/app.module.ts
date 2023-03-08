import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://edgar_lagos:hcB1I3QbOiiYdeA6@cluster0.nuwmk5t.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
    PackagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
