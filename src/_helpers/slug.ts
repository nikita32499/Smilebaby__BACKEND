import slugify from 'slugify';

export const createSlug = (str: string): string => {
    return slugify(str, { lower: true });
};
