import { Device } from '../devices/devices.interfaces';

export interface Widget {
    device: Device;
    hidden: boolean;
}
