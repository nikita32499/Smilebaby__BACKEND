// type TypeUserRole = 'admin' | 'user';

export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}
export interface IUser {
  id: number;
  login: string;
  password: string;
  role: UserRole;
  createdAt: number;
  lastAt: number | null;
}

export interface IUserCreate
  extends Omit<IUser, 'id' | 'createdAt' | 'lastAt'> {}

export interface IUserUpdate
  extends Partial<Omit<IUser, 'id' | 'createdAt' | 'lastAt'>> {}

export interface IJwtUserData {
  userId: number;
  role: UserRole;
}

export interface IUserJwtData {
  userId: number;
  role: UserRole;
}

export function isJwtUserData(payload: unknown): payload is IJwtUserData {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'userId' in payload &&
    'role' in payload
  );
}

export function isUser(data: unknown): data is IUser {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'login' in data &&
    'password' in data &&
    'role' in data &&
    'createdAt' in data &&
    'lastAt' in data
  );
}
