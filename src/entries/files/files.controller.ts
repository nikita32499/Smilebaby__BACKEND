import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { Roles } from '_decorators/Roles';
import { UserRole } from 'shared_SmileBaby/dist/types/user.types';

import { createSlug } from '_helpers/slug';
import { Response } from 'express';
import { IFileCreate } from 'shared_SmileBaby/dist/types/file.types';

@Controller({
    path: '/files',
})
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Post('/uploadOne')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    cb(null, createSlug(`${Date.now()} ${file.originalname}`));
                },
            }),
        }),
    )
    async uploadFile(
        @Res({ passthrough: true }) res: Response,
        @UploadedFile() file: Express.Multer.File,
    ) {
        res.json({ path: `/api/static/${file.filename}` } satisfies IFileCreate);
        res.end();
    }
}
