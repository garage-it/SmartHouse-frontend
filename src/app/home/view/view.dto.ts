import { MapViewInfoDto, MapViewInfoCreateDto } from '../map-view/map-view.dto';
import { DashboardViewInfoDto } from '../dashboard-view/dashboard-view.dto';

export interface ViewInfoDto {
    name: string,
    description: string,
    defaultSubview: string,
    mapSubview?: MapViewInfoCreateDto | MapViewInfoDto;
    dashboardSubview?: DashboardViewInfoDto;
}
