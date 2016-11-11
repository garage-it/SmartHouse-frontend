import { Device } from '../devices/device.model';

export interface Widget {
    device: Device;
    hidden: boolean;
}
