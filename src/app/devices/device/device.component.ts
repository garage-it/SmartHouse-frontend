import { Component, Input } from '@angular/core';
import { Device } from '../device.model';

@Component({
    selector: 'sh-device',
    templateUrl: './device.template.html',
    styleUrls: ['./device.style.scss']
})
export class DeviceComponent {
    @Input() device: Device;

    public switcher: boolean = false;

    switchSensor(): void {
        this.device.executor = !this.device.executor;
    }

    switcherImageUrl(): string {
        return this.device.executor ? 'url(assets/switcherON.svg)' : 'url(assets/switcherOFF.svg)';
    }
}
