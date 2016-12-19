import { SensorDto } from './sensor.dto';

export interface DashboardSubviewDto {
    _id: string,
    parentViewId?: string;
    active: boolean;
    sensors: Array<SensorDto>;
}
