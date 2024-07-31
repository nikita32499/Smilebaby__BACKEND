// import { Module, forwardRef } from '@nestjs/common';
// import { UsersModule } from 'users/users.module';
// import { UsersService } from 'users/users.service';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// @Module({
//     imports: [forwardRef(() => UsersModule)],
//     controllers: [AuthController],
//     providers: [AuthService, UsersService],
//     exports: [AuthService],
// })
// export class AuthModule {}

import { Module, forwardRef } from '@nestjs/common';
// import { UsersService } from 'users/users.service';
import { UsersModule } from 'user/users.module';
import { AuthFlowManager } from './AuthFlowManager.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
    imports: [forwardRef(() => UsersModule)],
    controllers: [AuthController],
    providers: [AuthService, AuthFlowManager] /*AuthManager , UsersService*/,
    exports: [AuthService],
})
export class AuthModule {}
