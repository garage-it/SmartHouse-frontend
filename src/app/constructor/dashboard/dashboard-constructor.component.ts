import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../devices/device.model';

@Component({
    selector: 'sh-dashboard-constructor',
    templateUrl: './dashboard-constructor.template.html',
    styleUrls: ['./dashboard-constructor.style.scss']
})
export class DashboardConstructorComponent {

    private devices: Device[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // this.widgets = this.route.snapshot.data['widgets'].devices;
        this.devices = this.route.snapshot.data['devices'];
    }

    onAddWidget(widget): void {
        // this.widgets.push({device: widget,hidden: true});
        this.devices = this.devices.filter(device => device._id !== widget._id);
    }

    onRemoveWidget({device}): void {
        // this.widgets = this.widgets.filter(widget => widget.device._id !== device._id);
        this.devices.push(device);
    }
}
