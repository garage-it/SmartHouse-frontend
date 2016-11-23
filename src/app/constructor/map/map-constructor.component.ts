import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../devices/device.model';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html'
})
export class MapConstructorComponent {

    private devices: Device[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.devices = this.route.snapshot.data['devices'];
    }

    onAddWidget(widget): void {
    }
}
