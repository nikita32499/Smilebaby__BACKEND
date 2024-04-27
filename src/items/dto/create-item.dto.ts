import { IItem, IItemCreate } from '@src/_types/items.types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

type TypeItemAmount = IItem['amount'][0];

interface IDtoItemCreate
  extends Omit<IItemCreate, 'season' | 'country' | 'section'> {}

class DtoItemAmount implements TypeItemAmount {
  @IsNumber()
  quantity!: number;

  @IsString()
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
  slug!: string;
}

export class DtoItemUpdate implements IDtoItemCreate {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  descriptions!: string;

  @IsOptional()
  @IsNumber()
  price!: number;

  @IsOptional()
  @IsString()
  img_main!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  img_prev!: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DtoItemAmount)
  amount!: DtoItemAmount[];

  @IsOptional()
  @IsNumber()
  seasonId!: number;

  @IsOptional()
  @IsNumber()
  countryId!: number;

  @IsOptional()
  @IsNumber()
  sectionId!: number;

  @IsOptional()
  @IsString()
  slug!: string;
}
