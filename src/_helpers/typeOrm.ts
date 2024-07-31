export function isUpdateSuccess<T extends { affected?: number | null | undefined }>(
    result: T,
): boolean {
    return typeof result.affected === 'number' && result.affected > 0 ? true : false;
}

export class ColumnNumberTransformer {
    public to(data: number): number {
        return data;
    }

    public from(data: string): number {
        return parseInt(data);
    }
}

export class EntriesColumnTransformer {
    // public to(data: st): number {
    //     return data;
    // }

    public from(data: { value: string }): string {
        return data.value;
    }
}
