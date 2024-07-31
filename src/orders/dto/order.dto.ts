import { createZodDto } from 'nestjs-zod';
import {
    SchemaOrderCreate,
    SchemaOrderUpdate,
} from 'shared_SmileBaby/dist/contract/order.contract';

export class DtoOrderCreate extends createZodDto(SchemaOrderCreate) {}

export class DtoOrderUpdate extends createZodDto(SchemaOrderUpdate) {}
