import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewController } from './view.controller';
import { ViewModel } from './view.model';
import { ViewService } from './view.service';

@Module({
    imports: [TypeOrmModule.forFeature([ViewModel])],
    controllers: [ViewController],
    providers: [ViewService],
})
export class ViewModule {}
