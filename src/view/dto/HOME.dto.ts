import { EnumViewNames, ICreateView } from '@src/_types/view';
import Ajv from 'ajv';
import { IsDefined, IsEnum, IsObject, IsString } from 'class-validator';

const ajv = new Ajv();

export class DtoView implements ICreateView {
  @IsEnum(EnumViewNames)
  name!: EnumViewNames;

  @IsString()
  description!: string;

  @IsDefined()
  @IsObject()
  payload!: object;
}

// export const validationView__HOME = ajv.compile<IView__HOME>(SchemaView__HOME);
