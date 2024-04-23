import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Roles } from '@src/_decorators/Roles';
import { EnumViewNames } from '@src/_types/view';
import { DtoView } from './dto/HOME.dto';
import { ViewService } from './view.service';
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

  @Roles('admin', 'moderator')
  @Post(`/setView`)
  async saveView(@Body() createData: DtoView) {
    switch (createData.name) {
      // case EnumViewNames.HOME:
      //   if (validationView__HOME(createData)) break;
      //   throw new BadRequestException(validationView__HOME.errors);

      default:
        throw new BadGatewayException(
          `Не нашлось View.name: ${createData.name}`,
        );
    }

    return await this.viewService.saveView(
      createData.name,
      createData.payload,
      createData.description,
    );
  }

  @Roles('admin', 'moderator')
  @Get('/getAll')
  async getAll() {
    return await this.viewService.getAll();
  }
}
