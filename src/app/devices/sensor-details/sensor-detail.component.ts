import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Sensor } from './sensor';
import { SensorDetailService } from '../shared/sensor-detail.service';
import ROUTING from './../../config.routing';

const template = require('./sensor-detail.template.html');
const style = require('./sensor-detail.style.css');

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

    ngOnInit() {
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

    save() {
        const observable = this.needUpdate ?
            this.sensorDetailService.update(this.sensor) :
            this.sensorDetailService.save(this.sensor);
        observable.subscribe(() => {
            this._navigateToList();
        });
    }

    cancel() {
        this._navigateToList();
    }

    remove() {
        this.sensorDetailService
            .delete(this.sensor)
            .subscribe(() => {
                this._navigateToList();
            });
    }

    _navigateToList() {
        this.router.navigate(['/devices']);
    }
}
