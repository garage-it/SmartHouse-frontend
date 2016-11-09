import { IDevice } from '../devices/devices.interfaces';

export interface IWidget {
    device: IDevice;
    hidden: boolean;
}
