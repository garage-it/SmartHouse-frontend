import { Device } from '../../devices/device.model';

export interface DashboardViewInfoDto {
    _id: string;
    active: boolean;
    devices: Array<Device>;
}
