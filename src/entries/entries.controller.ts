import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  async getById(@Param('id') id: string) {
    return this.entriesService.getById(+id);
  }

  @Post('/update')
  update(@Param('id') id: string, @Body() updateEntryDto: DtoEntryCreate) {
    return this.entriesService.update(+id, updateEntryDto);
  }

  @Delete('/delete')
  async remove(@Param('id') id: string) {
    return this.entriesService.remove(+id);
  }
}
