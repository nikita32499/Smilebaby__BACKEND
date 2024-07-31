import { ColumnNumberTransformer } from '_helpers/typeOrm';
import { IUser, UserRole } from 'shared_SmileBaby/dist/types/user.types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel implements IUser {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column({ type: 'enum', enum: UserRole })
    declare role: UserRole;

    @Column({ unique: true })
    declare login: string;

    @Column()
    declare password: string;

    @Column({
        type: 'bigint',
        default: () => Date.now().toString(),
        transformer: new ColumnNumberTransformer(),
    })
    declare createdAt: number;

    @Column({
        type: 'bigint',
        default: null,
        nullable: true,
        transformer: new ColumnNumberTransformer(),
    })
    declare lastAt: number;
}
