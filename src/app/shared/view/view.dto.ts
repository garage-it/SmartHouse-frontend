import { MapViewInfoDto, MapViewInfoCreateDto } from './map-view.dto';
import { DashboardViewInfoDto } from './dashboard-view.dto';

export interface ViewInfoDto {
    _id: string;
    name: string;
    description: string;
    defaultSubview: string;
    mapSubview?: MapViewInfoDto | MapViewInfoCreateDto;
    dashboardSubview?: DashboardViewInfoDto;
}
