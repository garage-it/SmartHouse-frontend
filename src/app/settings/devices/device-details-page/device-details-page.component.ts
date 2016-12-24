import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Device } from '../../../shared/devices/device.model';
import { DevicesService } from '../../../shared/devices/devices.service';
import { DialogService } from '../../../shared/dialog/dialog.service';
import ROUTING from './../../../config.routing';

@Component({
    selector: 'sh-device-details-page',
    templateUrl: './device-details-page.template.html',
    styleUrls: ['./device-details-page.style.scss']
})
export class DeviceDetailsPageComponent {

    private needUpdate: boolean;
    private sensor: Device;

    constructor(
        private sensorDetailService: DevicesService,
        private router: Router,
        private route: ActivatedRoute,
        private dialogService: DialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this.needUpdate = true;
        this.sensor = new Device();
    }

    public ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id === ROUTING.CREATE) {
            this.needUpdate = false;
            return;
        }
        this.sensorDetailService
            .get(id)
            .subscribe(data => {
                this.sensor = new Device(data);
            });
    }

    public save(): void {
        const observable = this.needUpdate ?
            this.sensorDetailService.update(this.sensor) :
            this.sensorDetailService.save(this.sensor);
        observable.subscribe(() => {
            this._navigateToList();
        });
    }

    public cancel(): void {
        this._navigateToList();
    }

    public remove(): void {
        const confirmOptions = {
            title: '',
            message: 'Are you sure you want to delete this sensor?'
        };

        this.dialogService.confirm(this.viewContainerRef, confirmOptions)
            .filter(isConfirmed => isConfirmed)
            .subscribe(() => {
                this.sensorDetailService
                    .delete(this.sensor)
                    .subscribe(() => {
                        this._navigateToList();
                    });
            });

    }

    public onExecutorChanged(): void {
        // make sure that executor and servo checkboxes
        // are both not checked at one time
        if (this.sensor.executor && this.sensor.servo) {
            this.sensor.servo = false;
        }
    }

    public onServoChanged(): void {
        if (this.sensor.executor && this.sensor.servo) {
            this.sensor.executor = false;
        }
    }

    /* TODO: move to the seperate file */
    public get typeList(): any[] {
        return [{
            text: 'Servo',
            value: 'servo'
        },
        {
            text: 'Switcher',
            value: 'switcher'
        },
        {
            text: 'Sensor',
            value: 'sensor'
        },
        {
            text: 'Camera',
            value: 'camera'
        }];
    }

    public get subTypeList(): any[] {
        return [{
            text: 'Socket',
            value: 'socket'
        },
        {
            text: 'Lock',
            value: 'lock'
        },
        {
            text: 'Temperature',
            value: 'temperature'
        },
        {
            text: 'Humidity',
            value: 'humidity'
        },
        {
            text: 'Electricity',
            value: 'electricity'
        },
        {
            text: 'Pressure',
            value: 'pressure'
        },
        {
            text: 'CO2',
            value: 'co2'
        }];
    }

    private _navigateToList(): void {
        this.router.navigate(['/settings/devices']);
    }
}
