import SensorDetailService from './sensor-detail.service';
import {SensorDetail} from './sensor-detail.component';

import { ActivatedRoute, Router } from '@angular/router';
import {beforeEachProviders} from '@angular/core/testing';
import {provide} from '@angular/core';

const observableSubscribe = {
    subscribe(fn) { fn(); }
};

class SensorDetailServiceMock {
    get() { return observableSubscribe; }
    save() { return observableSubscribe; }
    update() { return observableSubscribe; }
    delete() { return observableSubscribe; }
}

class ActivatedRouteMock {
    constructor(id) {
        this.snapshot = {
            params: {id}
        };
    }
}

class RouterMock {
    navigate() {}
}

describe('sensor-detail module', () => {
    let sut;
    let sensorDetailService;
    let route;
    let router;
    let idMock;

    beforeEachProviders(() => [
        provide(SensorDetailService, {useClass: SensorDetailServiceMock}),
        provide(ActivatedRoute, {useClass: ActivatedRouteMock}),
        provide(Router, {useClass: RouterMock})
    ]);

    beforeEach(() => {
        idMock = 'mock';
        sensorDetailService = new SensorDetailServiceMock();
        route = new ActivatedRouteMock(idMock);
        router = new RouterMock();
        spyOn(sensorDetailService, 'get').and.callThrough();
        spyOn(sensorDetailService, 'save').and.callThrough();
        spyOn(sensorDetailService, 'update').and.callThrough();
        spyOn(sensorDetailService, 'delete').and.callThrough();
        spyOn(observableSubscribe, 'subscribe').and.callThrough();
        spyOn(router, 'navigate').and.callThrough();
        sut = new SensorDetail(sensorDetailService, router, route);
    });

    it('should create new sensor if id isn\'t passed to class', () => {
        expect(sut.sensor).toBeDefined();
    });

    it('should not make get request when creating new sensor', () => {
        route = new ActivatedRouteMock();
        sut = new SensorDetail(sensorDetailService, router, route);
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

    it('should navigate to the list of sensors on save', (done) => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.needUpdate = true;
        sut.save();
        expect(sut.router.navigate).toHaveBeenCalledWith(['/devices']);
        done();
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
        expect(sut.router.navigate).toHaveBeenCalledWith(['/devices']);
        done();
    });

    it('should navigate to the list of devices on cancel', () => {
        sut.cancel();
        expect(sut.router.navigate).toHaveBeenCalledWith(['/devices']);
    });
});
