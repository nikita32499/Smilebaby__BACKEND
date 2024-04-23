import { IItem, IItemCreate } from '@src/_types/items';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { DataType } from 'sequelize-typescript';

type TypeItemAmount = IItem['amount'][0];

interface IDtoItemCreate
  extends Omit<IItemCreate, 'season' | 'country' | 'section'> {}

class DtoItemAmount implements TypeItemAmount {
  @IsNumber()
  quantity!: number;

  @IsNumber()
  size!: string;
}

export class DtoItemCreate implements IDtoItemCreate {
  @IsString()
  name!: string;

  @IsString()
  descriptions!: string;

  @IsNumber()
  price!: number;

  @IsString()
  img_main!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataType.STRING)
  img_prev!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DtoItemAmount)
  amount!: DtoItemAmount[];

  @IsNumber()
  seasonId!: number;

  @IsNumber()
  countryId!: number;

  @IsNumber()
  sectionId!: number;

  @IsString()
  url!: string;
}
