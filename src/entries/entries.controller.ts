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
import { DtoEntryCreate } from './dto/create-entry.dto';
import { EntriesService } from './entries.service';

@Controller({
  path: '/entries',
})
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Post('/create')
  async create(@Body() createData: DtoEntryCreate) {
    return this.entriesService.create(createData);
  }

  @Roles('public')
  @Get('/getAll')
  async getAll() {
    return this.entriesService.getAll();
  }

  @Roles('public')
  @Get('/getById')
  async getById(@Body('id', new ParseIntPipe()) id: number) {
    return this.entriesService.getById(id);
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Post('/update')
  update(
    @Body('id', new ParseIntPipe()) id: number,
    @Body() updateData: DtoEntryCreate,
  ) {
    return this.entriesService.update(id, updateData);
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Delete('/delete')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.entriesService.delete(id);
  }
}
