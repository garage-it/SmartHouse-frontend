import { Device } from '../../shared/devices/device.model';

export interface DashboardViewInfoDto {
    _id: string;
    active: boolean;
    devices: Array<Device>;
}
