import {
    IOrder,
    IOrderCreate,
    IOrderUpdate,
} from 'shared_SmileBaby/dist/types/order.types';

export interface IOrderRepository {
    getAll: () => Promise<IOrder[]>;
    getById: (id: number) => Promise<IOrder | null>;
    create: (createData: IOrderCreate) => Promise<IOrder>;
    update: (updateData: IOrderUpdate) => Promise<boolean>;
    delete: (id: number) => Promise<boolean>;
}
