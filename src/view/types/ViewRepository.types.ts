import {
    EnumViewNames,
    IViewCreateUnion,
} from 'shared_SmileBaby/dist/types/view-custom.types';
import { IView } from 'shared_SmileBaby/dist/types/view.types';
export interface IViewRepository {
    saveView: (createData: IViewCreateUnion) => Promise<IView | null>;
    getView: (name: EnumViewNames) => Promise<IView | null>;
    getAll: () => Promise<IView[]>;
}
