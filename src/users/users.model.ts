// import { IUser, IUserCreate, IUserUpdate, UserRole } from '../_types/user';

// import { IsEnum, IsOptional, IsString } from 'class-validator';
// import {
//   AfterFind,
//   AllowNull,
//   AutoIncrement,
//   Column,
//   DataType,
//   Model,
//   PrimaryKey,
//   Table,
// } from 'sequelize-typescript';

// @Table({
//   tableName: 'users',
//   timestamps: false,
// })
// export class UserModel
//   extends Model<IUser, IUserCreate>
//   implements Required<IUser>
// {
//   @PrimaryKey
//   @AutoIncrement
//   @Column
//   declare id: number;

//   @Column({
//     type: DataType.STRING,
//     unique: true,
//   })
//   declare login: string;

//   @Column(DataType.STRING)
//   declare password: string;

//   @Column(DataType.ENUM(...Object.values(UserRole)))
//   declare role: UserRole;

//   @Column({
//     type: DataType.BIGINT,
//     defaultValue: () => Date.now(),
//   })
//   declare createdAt: number;

//   @AllowNull
//   @Column({
//     type: DataType.BIGINT,

//     defaultValue: null,
//   })
//   declare lastAt: number;

//   @AfterFind
//   static FindResult(findResult: IUser | IUser[] | null) {
//     if (findResult == null) return;
//     if (!Array.isArray(findResult)) findResult = [findResult];
//     for (const user of findResult) {
//       user.createdAt = Number(user.createdAt);
//       user.lastAt = user.lastAt && Number(user.lastAt);
//     }
//   }
// }

import { IUser, IUserCreate, UserRole } from '@src/_types/user.types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class DtoUserCreate implements IUserCreate {
  @IsString()
  declare login: string;

  @IsString()
  declare password: string;

  @IsEnum(UserRole)
  declare role: UserRole;
}

export class DtoUserUpdate implements IUserCreate {
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

@Entity()
export class UserModel implements Required<IUser> {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ type: 'enum', enum: UserRole })
  declare role: UserRole;

  @Column({ unique: true })
  declare login: string;

  @Column()
  declare password: string;

  @Column({ type: 'bigint', default: () => Date.now().toString() })
  declare createdAt: number;

  @Column({ type: 'bigint', default: null, nullable: true })
  declare lastAt: number;

  @AfterLoad()
  afterLoadHandler() {
    this.createdAt = Number(this.createdAt);
    this.lastAt = Number(this.lastAt);
  }
}

//магазин state:open  -language:PHP -language:Python   -language:Java  -language:C#   -language:Lua
