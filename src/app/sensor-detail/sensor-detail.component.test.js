import SensorDetailService from './sensor-detail.service';
import {SensorDetail} from './sensor-detail.component';
import Sensor from './sensor';

import {RouteParams} from 'angular2/router';
import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

const observableSubscribe = {
    subscribe() {
    }
};

class SensorDetailServiceMock {
    get() {
        return observableSubscribe;
    }

    save() {
        return observableSubscribe;
    }
}

class RouteParamsMock {
    constructor(id) {
        this.idMock = id;
    }

    get() {
        return this.idMock;
    }
}

describe('sensor-detail module', () => {
    let sut;
    let sensorDetailService;
    let routeParams;
    let idMock;

    beforeEachProviders(() => [
        provide(SensorDetailService, {useClass: SensorDetailServiceMock}),
        provide(RouteParams, {useClass: RouteParamsMock})
    ]);

    beforeEach(() => {
        idMock = 'mock';
        sensorDetailService = new SensorDetailServiceMock();
        routeParams = new RouteParamsMock(idMock);
        spyOn(sensorDetailService, 'get').and.callThrough();
        spyOn(sensorDetailService, 'save').and.callThrough();
        spyOn(routeParams, 'get').and.callThrough();
        sut = new SensorDetail(sensorDetailService, routeParams);
    });

    it('should create new sensor if id isn\'t passed to class', () => {
        expect(sut.sensor).toBeDefined();
    });

    it('should get sensor by given id', () => {
        sut.ngOnInit();
        expect(sut.sensorDetailService.get).toHaveBeenCalledWith(idMock);
    });

    it('should save sensor', () => {
        let sensorMock = {};
        sut.sensor = sensorMock;
        sut.save();
        expect(sut.sensorDetailService.save).toHaveBeenCalledWith(sensorMock);
    });
});
