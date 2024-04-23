import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DtoItemCreate } from './dto/create-item.dto';
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
  getById(@Param('id') id: string) {
    return this.itemsService.getById(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
  //   return this.itemsService.update(+id, updateItemDto);
  // }

  @Delete('/delete')
  delete(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
