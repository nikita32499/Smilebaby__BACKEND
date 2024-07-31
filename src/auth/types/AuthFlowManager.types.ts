import { IUser } from 'shared_SmileBaby/dist/types/user.types';

export interface IAuthFlowManager {
    authorization: (
        login: string,
        password: string,
    ) => Promise<null | {
        user: IUser;
        token: string;
    }>;
}
