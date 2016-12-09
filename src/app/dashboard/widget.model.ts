import { Device } from '../devices/shared/device.model';

export class Widget {
    _id?: string;
    device: Device;
    hidden: boolean;
    value: string|number|boolean|null;
}
