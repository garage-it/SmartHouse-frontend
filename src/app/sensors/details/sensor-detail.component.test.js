import SensorDetailService from './sensor-detail.service';
import {SensorDetail} from './sensor-detail.component';

import {RouteParams, Router} from 'angular2/router';
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

    update() {
        return observableSubscribe;
    }

    delete() {
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

class RouterMock {
    navigate() {}
}

describe('sensor-detail module', () => {
    let sut;
    let sensorDetailService;
    let routeParams;
    let router;
    let idMock;

    beforeEachProviders(() => [
        provide(SensorDetailService, {useClass: SensorDetailServiceMock}),
        provide(RouteParams, {useClass: RouteParamsMock}),
        provide(Router, {useClass: RouterMock})
    ]);

    beforeEach(() => {
        idMock = 'mock';
        sensorDetailService = new SensorDetailServiceMock();
        routeParams = new RouteParamsMock(idMock);
        router = new RouterMock();
        spyOn(sensorDetailService, 'get').and.callThrough();
        spyOn(sensorDetailService, 'save').and.callThrough();
        spyOn(sensorDetailService, 'update').and.callThrough();
        spyOn(sensorDetailService, 'delete').and.callThrough();
        spyOn(observableSubscribe, 'subscribe').and.callThrough();
        spyOn(routeParams, 'get').and.callThrough();
        spyOn(router, 'navigate').and.callThrough();
        sut = new SensorDetail(sensorDetailService, routeParams, router);
    });

    it('should create new sensor if id isn\'t passed to class', () => {
        expect(sut.sensor).toBeDefined();
    });

    it('should not make get request when creating new sensor', () => {
        routeParams = new RouteParamsMock();
        sut = new SensorDetail(sensorDetailService, routeParams, router);
        sut.ngOnInit();
        expect(sut.sensorDetailService.get).not.toHaveBeenCalled();
    });

    it('should get sensor by given id', () => {
        sut.ngOnInit();
        expect(sut.sensorDetailService.get).toHaveBeenCalledWith(idMock);
    });

    it('should save new sensor', () => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.needUpdate = false;
        sut.save();
        expect(sut.sensorDetailService.save).toHaveBeenCalledWith(sensorMock);
    });

    it('should update sensor', () => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.needUpdate = true;
        sut.save();
        expect(sut.sensorDetailService.update).toHaveBeenCalledWith(sensorMock);
    });

    it('should remove sensor', () => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.remove();
        expect(sut.sensorDetailService.delete).toHaveBeenCalledWith(sensorMock);
    });

    it('should navigate to the list of sensors on remove', (done) => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.remove();
        observableSubscribe.subscribe.calls.mostRecent().args[0]();
        expect(sut.router.navigate).toHaveBeenCalledWith(['DeviceList']);
        done();
    });

    it('should navigate to the list of devices on cancel', () => {
        sut.cancel();
        expect(sut.router.navigate).toHaveBeenCalledWith(['DeviceList']);
    });
});
