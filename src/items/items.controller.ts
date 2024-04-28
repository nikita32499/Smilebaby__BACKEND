import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Roles } from '@src/_decorators/Roles';
import { UserRole } from '@src/_types/user.types';
import { DtoItemCreate, DtoItemUpdate } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller({
  path: '/items',
})
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Post('/create')
  create(@Body() createData: DtoItemCreate) {
    return this.itemsService.create(createData);
  }

  @Roles('public')
  @Get('/getAll')
  getAll() {
    return this.itemsService.getAll();
  }

  @Roles('public')
  @Get('/getById')
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.itemsService.getById(id);
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Post('/update')
  update(
    @Body('id', new ParseIntPipe()) id: number,
    @Body('data') updateData: DtoItemUpdate,
  ) {
    return this.itemsService.update(id, updateData);
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Delete('/delete')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.itemsService.delete(+id);
  }
}
