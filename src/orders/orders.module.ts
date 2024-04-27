import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from './order.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderModel])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
