import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Roles } from '@src/_decorators/Roles';
import { UserRole } from '@src/_types/user.types';
import {
  EnumViewNames,
  IView__HOME,
  SchemaView__HOME,
} from '@src/_types/view.types';

import { DtoView } from './dto/HOME.dto';
import { ViewService } from './view.service';

import Ajv from 'ajv';

const ajv = new Ajv();

const ValidateAjv__HOME = ajv.compile<IView__HOME>(SchemaView__HOME);

@Controller('/view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Roles('public')
  @Get('/getView/:name')
  async getView(@Param('name') name: EnumViewNames) {
    const view = await this.viewService.getView(name);
    if (!view)
      throw new BadGatewayException(`ViewModel:${name} не установлена `);

    return view;
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Post(`/setView`)
  async saveView(@Body() createData: DtoView) {
    switch (createData.name) {
      case EnumViewNames.HOME:
        const valid = ValidateAjv__HOME(createData);
        if (!valid) {
          throw new BadRequestException(ValidateAjv__HOME.errors);
        }

        break;
      default:
        throw new BadGatewayException(
          `Не нашлось View.name: ${createData.name}`,
        );
    }

    return await this.viewService.saveView(createData);
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Get('/getAll')
  async getAll() {
    return await this.viewService.getAll();
  }
}
