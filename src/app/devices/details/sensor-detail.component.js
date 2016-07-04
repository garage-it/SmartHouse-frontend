import {Injectable, Component} from '@angular/core';
import {NgForm} from '@angular/common';// eslint-disable-line
import {RouteParams, Router} from '@angular/router';
import {Http, HTTP_PROVIDERS} from '@angular/http';

import Sensor from './sensor';
import SensorDetailService from './sensor-detail.service';
import template from './sensor-detail.html';
import style from './sensor-detail.css';

const selector = 'sh-sensor-detail';

@Component({
    selector,
    template,
    styles: [style],
    providers: [
        Http,
        HTTP_PROVIDERS,
        SensorDetailService
    ]
})
@Injectable()
export class SensorDetail {
    constructor(sensorDetailService:SensorDetailService, routeParams:RouteParams, router:Router) {
        this.sensorDetailService = sensorDetailService;
        this.routeParams = routeParams;
        this.router = router;

        this.needUpdate = true;
        this.sensor = new Sensor();
    }

    ngOnInit() {
        const id = this.routeParams.get('id');
        if (!id) {
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
        this.router.navigate(['DeviceList']);
    }
}
