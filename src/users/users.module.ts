import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UserModel } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
