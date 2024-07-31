import { createZodDto } from 'nestjs-zod';
import { SchemaUserAuth } from 'shared_SmileBaby/dist/contract/user.contract';

export class DtoUserAuth extends createZodDto(SchemaUserAuth) {}
