import { Device } from '../shared/devices/device.model';

export class Widget {
    _id?: string;
    device: Device;
    hidden: boolean;
    value: string|number|boolean|null;
}
