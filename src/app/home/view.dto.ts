import { MapViewInfoDto } from './map-view/map-view.dto';
import { Device } from '../shared/devices/device.model';

export interface DashboardViewInfoDto {
    _id: string,
    devices: Device
}

export interface ViewInfoDto {
    mapView?: MapViewInfoDto,
    dashboard?: DashboardViewInfoDto
}
