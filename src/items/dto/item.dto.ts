import { createZodDto } from 'nestjs-zod';
import {
    SchemaItemCreate,
    SchemaItemUpdate,
} from 'shared_SmileBaby/dist/contract/item.contract';

export class DtoItemCreate extends createZodDto(SchemaItemCreate) {}

export class DtoItemUpdate extends createZodDto(SchemaItemUpdate) {}
