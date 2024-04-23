import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EntriesController } from './entries.controller';
import { EntriesModel } from './entries.model';
import { EntriesService } from './entries.service';

@Module({
  imports: [SequelizeModule.forFeature([EntriesModel])],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
