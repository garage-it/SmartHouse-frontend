import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../devices/device.model';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html'
})
export class MapConstructorComponent {

    private sensors: Device[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.sensors = this.route.snapshot.data['sensors'];
    }

    onAddSensor(sensor): void {
    }
}
