import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Sensor } from './sensor';
import { SensorDetailService } from '../shared/sensor-detail.service';
import ROUTING from './../../config.routing';

const template = require('./sensor-detail.template.html');
const style = require('./sensor-detail.style.scss');

const selector = 'sh-sensor-detail';

@Component({
    selector,
    template,
    styles: [style]
})
export class SensorDetailComponent {

    private needUpdate: boolean;
    private sensor: Sensor;

    constructor(
        private sensorDetailService: SensorDetailService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.sensorDetailService = sensorDetailService;
        this.router = router;
        this.route = route;

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
        this.sensorDetailService
            .delete(this.sensor)
            .subscribe(() => {
                this._navigateToList();
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
