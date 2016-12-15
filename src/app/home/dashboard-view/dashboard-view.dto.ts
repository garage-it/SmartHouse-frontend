import { Device } from '../../shared/devices/device.model';

export interface DashboardViewInfoDto {
    _id: string;
    parentViewId?: string;
    devices: Device;
}
