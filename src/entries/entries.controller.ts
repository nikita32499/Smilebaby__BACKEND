import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Roles } from '_decorators/Roles';
import { UserRole } from 'shared_SmileBaby/dist/types/user.types';
import { DtoEntriesCreate, DtoEntriesUpdate } from './dto/entries.dto';
import { EntriesService } from './entries.service';

@Controller({
    path: '/entries',
})
export class EntriesController {
    constructor(private readonly entriesService: EntriesService) {}

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Post('/create')
    async create(@Body() createData: DtoEntriesCreate) {
        return this.entriesService.create(createData);
    }

    @Roles('public')
    @Get('/getAll')
    async getAll() {
        return this.entriesService.getAll();
    }

    @Roles('public')
    @Get('/getById/:id')
    async getById(@Param('id', new ParseIntPipe()) id: number) {
        return this.entriesService.getById(id);
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Post('/update')
    async update(@Body() newDataEntries: DtoEntriesUpdate): Promise<TSuccessResponse> {
        console.log(newDataEntries);
        // throw new Error("")
        const success = await this.entriesService.update(newDataEntries);
        return { success };
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Delete('/delete')
    async async(@Body('id', new ParseIntPipe()) id: number): Promise<TSuccessResponse> {
        const success = await this.entriesService.delete(id);
        return { success };
    }
}
