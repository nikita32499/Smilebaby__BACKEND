import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DtoItemCreate, DtoItemUpdate } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller({
  path: '/items',
})
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('/create')
  create(@Body() createData: DtoItemCreate) {
    return this.itemsService.create(createData);
  }

  @Get('/getAll')
  getAll() {
    return this.itemsService.getAll();
  }

  @Get('/getById')
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.itemsService.getById(id);
  }

  @Post('/update')
  update(
    @Body('id', new ParseIntPipe()) id: number,
    @Body('data') updateData: DtoItemUpdate,
  ) {
    return this.itemsService.update(id, updateData);
  }

  @Delete('/delete')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.itemsService.delete(+id);
  }
}
