import {Injectable, Component} from 'angular2/core';
import {NgForm} from 'angular2/common';// eslint-disable-line
import {RouteParams, Router} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

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
            }, this._onError, this._onComplete);
    }

    save() {
        const observable = this.needUpdate ?
            this.sensorDetailService.update(this.sensor) :
            this.sensorDetailService.save(this.sensor);
        observable.subscribe(() => this._navigateToList(),
            this._onError,
            this._onComplete);
    }

    cancel() {
        this._navigateToList();
    }

    remove() {
        this.sensorDetailService
            .delete(this.sensor)
            .subscribe(() => {}, this._onError, this._navigateToList());
    }

    _navigateToList() {
        this.router.navigate(['DeviceList']);
    }

    _onError(error) {
        console.error(error);// eslint-disable-line
    }

    _onComplete() {
        console.log('Completed!');// eslint-disable-line
    }
}
