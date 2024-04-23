import { IUser, IUserCreate, IUserUpdate, UserRole } from '../_types/user';

import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  AfterFind,
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class UserModel
  extends Model<IUser, IUserCreate>
  implements Required<IUser>
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare login: string;

  @Column(DataType.STRING)
  declare password: string;

  @Column(DataType.ENUM(...Object.values(UserRole)))
  declare role: UserRole;

  @Column({
    type: DataType.BIGINT,
    defaultValue: () => Date.now(),
  })
  declare createdAt: number;

  @AllowNull
  @Column({
    type: DataType.BIGINT,

    defaultValue: null,
  })
  declare lastAt: number;

  @AfterFind
  static FindResult(findResult: IUser | IUser[] | null) {
    if (findResult == null) return;
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const user of findResult) {
      user.createdAt = Number(user.createdAt);
      user.lastAt = user.lastAt && Number(user.lastAt);
    }
  }
}

export class DtoUserCreate implements IUserCreate {
  @IsString()
  declare login: string;

  @IsString()
  declare password: string;

  @IsEnum(UserRole)
  declare role: UserRole;
}

export class DtoUserUpdate implements IUserUpdate {
  @IsOptional()
  @IsString()
  declare login: string;

  @IsOptional()
  @IsString()
  declare password: string;

  @IsOptional()
  @IsEnum(UserRole)
  declare role: UserRole;
}
