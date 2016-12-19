import { DeviceDto } from './device.dto'

export interface SensorDto {
    _id: string,
    position: Position,
    sensor: DeviceDto
}

export interface SensorUpdateDto {
    position: Position,
    sensor: DeviceDto
}

export interface Position {
    x: Number;
    y: Number;
}
