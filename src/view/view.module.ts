import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ViewController } from './view.controller';
import { ViewModel } from './view.model';
import { ViewService } from './view.service';

@Module({
  imports: [SequelizeModule.forFeature([ViewModel])],
  controllers: [ViewController],
  providers: [ViewService],
})
export class ViewModule {}
