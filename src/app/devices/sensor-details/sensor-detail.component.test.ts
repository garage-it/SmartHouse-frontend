import {async, TestBed} from '@angular/core/testing';

import { SensorDetailService } from '../shared/sensor-detail.service';
import { SensorDetailComponent } from './sensor-detail.component';
import { Sensor } from './sensor';

import { ActivatedRoute, Router } from '@angular/router';

const observableSubscribe = {
    subscribe(fn) { fn(); }
};

class SensorDetailComponentServiceMock {
    get() { return observableSubscribe; }
    save() { return observableSubscribe; }
    update() { return observableSubscribe; }
    delete() { return observableSubscribe; }
}

class ActivatedRouteMock {
    private snapshot;
    constructor(id?) {
        this.snapshot = {
            params: {id}
        };
    }
}

class RouterMock {
    navigate() {}
}

describe('sensor-detail', () => {
    let sut;
    let sensorDetailService;
    let route;
    let router;
    const idMock = 'mock';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SensorDetailComponent ],
            providers: [
                { provide: SensorDetailService, useClass: SensorDetailComponentServiceMock },
                { provide: ActivatedRoute, useValue: new ActivatedRouteMock(idMock) },
                { provide: Router, useClass: RouterMock }
            ]
        })
        .overrideComponent(SensorDetailComponent, {
            set: {template: 'mocked template'}
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.createComponent(SensorDetailComponent).componentInstance;

            sensorDetailService = TestBed.get(SensorDetailService);
            route = TestBed.get(ActivatedRoute);
            router = TestBed.get(Router);

            spyOn(sensorDetailService, 'get').and.callThrough();
            spyOn(sensorDetailService, 'save').and.callThrough();
            spyOn(sensorDetailService, 'update').and.callThrough();
            spyOn(sensorDetailService, 'delete').and.callThrough();
            spyOn(observableSubscribe, 'subscribe').and.callThrough();
            spyOn(router, 'navigate').and.callThrough();
        });
    }));

    it('should create new sensor if id isn\'t passed to class', () => {
        expect(sut.sensor).toBeDefined();
    });

    it('should not make get request when creating new sensor', () => {
        route = new ActivatedRouteMock();
        sut = new SensorDetailComponent(sensorDetailService, router, route);
        sut.ngOnInit();
        expect(sensorDetailService.get).not.toHaveBeenCalled();
    });

    it('should get sensor by given id', () => {
        sut.ngOnInit();
        expect(sensorDetailService.get).toHaveBeenCalledWith(idMock);
    });

    it('should save new sensor', () => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.needUpdate = false;
        sut.save();
        expect(sensorDetailService.save).toHaveBeenCalledWith(sensorMock);
    });

    it('should navigate to the list of sensors on save', (done) => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.needUpdate = true;
        sut.save();
        expect(router.navigate).toHaveBeenCalledWith(['/devices']);
        done();
    });

    it('should update sensor', () => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.needUpdate = true;
        sut.save();
        expect(sensorDetailService.update).toHaveBeenCalledWith(sensorMock);
    });

    it('should remove sensor', () => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.remove();
        expect(sensorDetailService.delete).toHaveBeenCalledWith(sensorMock);
    });

    it('should navigate to the list of sensors on remove', (done) => {
        const sensorMock = {};
        sut.sensor = sensorMock;
        sut.remove();
        (observableSubscribe.subscribe as jasmine.Spy).calls.mostRecent().args[0]();
        expect(router.navigate).toHaveBeenCalledWith(['/devices']);
        done();
    });

    it('should navigate to the list of devices on cancel', () => {
        sut.cancel();
        expect(router.navigate).toHaveBeenCalledWith(['/devices']);
    });

    it('should not allow both executor and servo to be checked at one time (servo changed)', () => {
        const sensorMock = new Sensor({
            servo: true,
            executor: true
        });

        sut.sensor = sensorMock;
        sut.needUpdate = true;
        sut.onServoChanged();
        expect(sut.sensor.executor).toBe(false);
    });

    it('should not allow both executor and servo to be checked at one time (executor changed)', () => {
        const sensorMock = new Sensor({
            servo: true,
            executor: true
        });

        sut.sensor = sensorMock;
        sut.needUpdate = true;
        sut.onExecutorChanged();
        expect(sut.sensor.servo).toBe(false);
    });
});
