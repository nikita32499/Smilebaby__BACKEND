import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EntriesModel } from '@src/entries/entries.model';
import { ItemsController } from './items.controller';
import { ItemModel } from './items.model';
import { ItemsService } from './items.service';

@Module({
  imports: [SequelizeModule.forFeature([ItemModel, EntriesModel])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
