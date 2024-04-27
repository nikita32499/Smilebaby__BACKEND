import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DtoEntryCreate } from './dto/create-entry.dto';
import { EntriesService } from './entries.service';

@Controller({
  path: '/entries',
})
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post('/create')
  async create(@Body() createData: DtoEntryCreate) {
    return this.entriesService.create(createData);
  }

  @Get('/getAll')
  async getAll() {
    return this.entriesService.getAll();
  }

  @Get('/getById')
  async getById(@Body('id', new ParseIntPipe()) id: number) {
    return this.entriesService.getById(id);
  }

  @Post('/update')
  update(
    @Body('id', new ParseIntPipe()) id: number,
    @Body() updateData: DtoEntryCreate,
  ) {
    return this.entriesService.update(id, updateData);
  }

  @Delete('/delete')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.entriesService.delete(id);
  }
}
