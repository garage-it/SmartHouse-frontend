import {
    SensorDto,
    SensorUpdateDto
} from './sensor.dto';

export interface MapSubviewDto {
    _id: string,
    active: boolean;
    sensors: Array<SensorDto>;
    pictureName: string;
}

export interface MapSubviewCreateDto {
    name: string;
    description: string;
    active: boolean;
    sensors: Array<SensorUpdateDto>;
}

// TODO: Remove when refactoring is finished
// export interface MapViewSensorUpdateDto {
//     sensor: string; // sensor id
//     position: Position;
// }
//
// export interface MapViewInfoDto {
//     _id: string;
//     name: string;
//     description: string;
//     pictureName: string;
//     active: boolean;
//     default: boolean;
//     sensors: Array<MapViewSensorDto>;
// }
//
