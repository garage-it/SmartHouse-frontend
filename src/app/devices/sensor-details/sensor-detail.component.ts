import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Sensor } from './sensor';
import { SensorDetailService } from '../shared/sensor-detail.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import ROUTING from './../../config.routing';

@Component({
    selector: 'sh-sensor-detail',
    templateUrl: './sensor-detail.template.html',
    styleUrls: ['./sensor-detail.style.scss']
})
export class SensorDetailComponent {

    private needUpdate: boolean;
    private sensor: Sensor;

    constructor(
        private sensorDetailService: SensorDetailService,
        private router: Router,
        private route: ActivatedRoute,
        private dialogService: DialogService,
        private viewContainerRef: ViewContainerRef
    ) {
        this.needUpdate = true;
        this.sensor = new Sensor();
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
                this.sensor = new Sensor(data);
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

    private _navigateToList(): void {
        this.router.navigate(['/devices']);
    }
}
