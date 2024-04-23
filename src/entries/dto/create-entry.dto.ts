import { EnumEntries, IEntriesCreate } from '@src/_types/entries';
import { IsEnum, IsString } from 'class-validator';

export class DtoEntryCreate implements IEntriesCreate {
  @IsEnum(EnumEntries)
  name!: EnumEntries;

  @IsString()
  value!: string;
}
