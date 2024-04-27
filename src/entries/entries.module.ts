import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesController } from './entries.controller';
import { EntriesModel } from './entries.model';
import { EntriesService } from './entries.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntriesModel])],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
