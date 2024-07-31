// import { Module, forwardRef } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'auth/auth.module';
// import { AuthService } from 'auth/auth.service';
// import { UsersController } from './users.controller';
// import { UserModel } from './users.model';
// import { UsersService } from './users.service';

// @Module({
//     imports: [TypeOrmModule.forFeature([UserModel]), forwardRef(() => AuthModule)],
//     controllers: [UsersController],
//     providers: [UsersService, AuthService],
//     exports: [UsersService],
// })
// export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { AuthService } from 'auth/auth.service';
import { UsersController } from './users.controller';
import { UserModel } from './users.model';
import { UsersService } from './users.service';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([UserModel])],
    controllers: [UsersController],
    providers: [UsersService, AuthService],
    exports: [UsersService],
})
export class UsersModule {}
