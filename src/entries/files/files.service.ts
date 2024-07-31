import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
    async uploadFile(file: Express.Multer.File): Promise<string> {
        return file.filename;
    }
}
