import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class EnumValidationPipe implements PipeTransform {
    constructor(private readonly enumType: object) {}
    transform(value: any, metadata: ArgumentMetadata) {
        if (!Object.values(this.enumType).includes(value)) {
            throw new BadRequestException(
                `Invalid ${metadata.data}: ${value}. Expected [${Object.values(this.enumType).join(', ')}]`,
            );
        }
        return value;
    }
}
