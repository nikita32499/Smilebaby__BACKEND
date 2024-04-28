import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@src/_types/user.types';

export const Roles = (...roles: (UserRole | 'public')[]) =>
  SetMetadata('roles', roles);

export const RolesController = (...roles: string[]): ClassDecorator => {
  return (target: any) => {
    SetMetadata('roles', roles)(target);

    for (const key of Object.getOwnPropertyNames(target.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      if (descriptor && typeof descriptor.value === 'function') {
        SetMetadata('roles', roles)(target.prototype, key, descriptor);
      }
    }
  };
};
