import { MapViewInfoDto } from './map-view/map-view.dto';
import { DashboardViewInfoDto } from './dashboard-view/dashboard-view.dto';

export interface ViewInfoDto {
    mapView?: MapViewInfoDto;
    dashboard?: DashboardViewInfoDto;
}
