import { createZodDto } from 'nestjs-zod';
import {
    SchemaUserCreate,
    SchemaUserUpdate,
} from 'shared_SmileBaby/dist/contract/user.contract';

export class DtoUserCreate extends createZodDto(SchemaUserCreate) {}

export class DtoUserUpdate extends createZodDto(SchemaUserUpdate) {}
