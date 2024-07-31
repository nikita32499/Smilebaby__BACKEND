import {
    BadGatewayException,
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import { Roles } from '_decorators/Roles';
import { UserRole } from 'shared_SmileBaby/dist/types/user.types';
import { EnumViewNames } from 'shared_SmileBaby/dist/types/view-custom.types';

import { SchemaViewCreateUnion } from 'shared_SmileBaby/dist/contract//view.contract';
import { ViewService } from './view.service';

import { EnumValidationPipe } from '_pipes/EnumValidationPipe';

@Controller('/view')
export class ViewController {
    constructor(private readonly viewService: ViewService) {}

    @Roles('public')
    @Get('/getView/:name')
    async getView(
        @Param('name', new EnumValidationPipe(EnumViewNames)) name: EnumViewNames,
    ) {
        const view = await this.viewService.getView(name);
        if (!view) throw new BadGatewayException(`ViewModel:${name} не установлена `);

        return view;
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Post(`/setView`)
    async saveView(@Body() createData: unknown) {
        const result = await SchemaViewCreateUnion.safeParseAsync(createData);

        if (result.success) {
            return await this.viewService.saveView(result.data);
        } else {
            throw new BadRequestException(result.error);
        }
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Get('/getAll')
    async getAll() {
        return await this.viewService.getAll();
    }
}
