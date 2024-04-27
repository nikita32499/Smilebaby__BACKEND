import { IOrderCreate } from '@src/_types/orders.types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

type TypeItemElement = IOrderCreate['items'][0];

class ItemElement implements TypeItemElement {
  @IsString()
  size!: string;

  @IsNumber()
  quantity!: number;

  @IsObject()
  item!: any;
}

export class DtoOrderCreate implements Required<IOrderCreate> {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  email!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemElement)
  items!: ItemElement[];
}

export class DtoOrderUpdate implements Required<IOrderCreate> {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  email!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemElement)
  items!: ItemElement[];
}
