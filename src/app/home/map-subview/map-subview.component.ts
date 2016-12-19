import { Component, Input } from '@angular/core';
import { MapSubviewDto } from '../../core/views/map-subview.dto';
import { MapSubviewService } from '../../core/views/map-subview.service';

@Component({
    selector: 'sh-map-subview',
    templateUrl: './map-subview.template.html',
    styleUrls: [ './map-subview.style.scss' ]
})
export class MapSubviewComponent {
    @Input() mapSubview: MapSubviewDto;

    constructor(private mapViewService: MapSubviewService) {}

    getImage(): string {
        return this.mapViewService.resolvePictureUrl(this.mapSubview);
    }

    switchSensor(device): void {
        device.executor = !device.executor;
    }

    switcherImageUrl(device): string {
        return device.executor ? 'url(assets/switcherON.svg)' : 'url(assets/switcherOFF.svg)';
    }
}
