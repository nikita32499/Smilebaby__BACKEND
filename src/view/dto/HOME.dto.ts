import { EnumViewNames, ICreateView } from '@src/_types/view.types';
import { IsDefined, IsEnum, IsObject, IsString } from 'class-validator';

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
