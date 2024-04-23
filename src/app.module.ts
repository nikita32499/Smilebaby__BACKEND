import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

import { SequelizeModule } from '@nestjs/sequelize';

import dotenv from 'dotenv';
import { UserModel } from './users/users.model';

import { APP_GUARD } from '@nestjs/core';
import { ViewModule } from 'src/view/view.module';
import { JwtAuthGuard } from './_guards/JwtAccess.guard';
import { EntriesModel } from './entries/entries.model';
import { EntriesModule } from './entries/entries.module';
import { ItemModel } from './items/items.model';
import { ItemsModule } from './items/items.module';
import { OrderModel } from './orders/order.model';
import { OrdersModule } from './orders/orders.module';
import { ViewModel } from './view/view.model';

dotenv.config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT!),
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_DATABASE!,
      models: [UserModel, ViewModel, ItemModel, EntriesModel, OrderModel],
      autoLoadModels: true,
      synchronize: true,
      logging: (log) => console.log(log),
    }),
    UsersModule,
    ViewModule,
    ItemsModule,
    OrdersModule,
    EntriesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
