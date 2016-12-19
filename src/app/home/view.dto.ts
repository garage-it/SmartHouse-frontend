import { MapSubviewDto } from '../core/views/map-subview.dto';
import { DashboardSubviewDto } from '../core/views/dashboard-subview.dto';

export interface ViewDto {
    name: string,
    description: string,
    default: string,
    mapSubview?: MapSubviewDto;
    dashboardSubview?: DashboardSubviewDto;
}
