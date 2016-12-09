import { SensorDetailComponent } from './sensor-detail.component';
import { Sensor } from './sensor';

import ROUTING from './../../config.routing';

import { Observable } from 'rxjs';

describe('sensor-detail', () => {
    let sut;
    let DevicesService;
    let DialogService;
    let ActivatedRoute;
    let Router;
    let ViewContainerRef;
    const idMock = 'mock';

    beforeEach(() => {
        DialogService = {
            confirm: jasmine.createSpy('confirm')
        };
        ViewContainerRef = {};

        ActivatedRoute  = {
            snapshot: {
                params: {
                    id: idMock
                }
            }
        };
        Router = {
            navigate: jasmine.createSpy('navigate')
        };
        DevicesService = {
            get: jasmine.createSpy('get'),
            save: jasmine.createSpy('save'),
            update: jasmine.createSpy('update'),
            delete: jasmine.createSpy('delete')
        };
        sut = new SensorDetailComponent(DevicesService, Router, ActivatedRoute, DialogService, ViewContainerRef);
    });

    it('should create new sensor if id isn\'t passed to class', () => {
        expect(sut.sensor).toBeDefined();
    });

    describe('#ngOnInit', () => {
        it('should not make get request when creating new sensor', () => {
            ActivatedRoute.snapshot.params.id = ROUTING.CREATE;
            sut = new SensorDetailComponent(DevicesService, Router, ActivatedRoute, DialogService, ViewContainerRef);
            sut.ngOnInit();
            expect(DevicesService.get).not.toHaveBeenCalled();
        });

        it('should get sensor by given id', () => {
            DevicesService.get.and.returnValue(Observable.of(idMock));
            sut.ngOnInit();
            expect(DevicesService.get).toHaveBeenCalledWith(idMock);
        });
    });

    describe('#save', () => {
        const sensorMock = {};
        beforeEach(() => {
            DevicesService.save.and.returnValue(Observable.of(sensorMock));
            DevicesService.update.and.returnValue(Observable.of(sensorMock));

            sut.sensor = sensorMock;
        });

        it('should save new sensor', () => {
            sut.needUpdate = false;
            sut.save();
            expect(DevicesService.save).toHaveBeenCalledWith(sensorMock);
        });

        it('should navigate to the list of sensors on save', (done) => {
            sut.needUpdate = true;
            sut.save();
            expect(Router.navigate).toHaveBeenCalledWith(['/devices']);
            done();
        });

        it('should update sensor', () => {
            sut.needUpdate = true;
            sut.save();
            expect(DevicesService.update).toHaveBeenCalledWith(sensorMock);
        });
    });

    describe('#cancel', () => {
        it('should navigate to the list of devices on cancel', () => {
            sut.cancel();
            expect(Router.navigate).toHaveBeenCalledWith(['/devices']);
        });
    });

    describe('#remove', () => {
        const sensorMock = {};
        const confirmOptions = {
            title: '',
            message: 'Are you sure you want to delete this sensor?'
        };

        beforeEach(() => {
            sut.sensor = sensorMock;
        });

        describe('before user confirmation', () => {
            beforeEach(() => {
                DialogService.confirm.and.returnValue(Observable.of(false));
                sut.remove();
            });

            it('should show confirm dialog with proper view and options', () => {
                expect(DialogService.confirm).toHaveBeenCalledWith(ViewContainerRef, confirmOptions);
            });

            it('should not remove sensor if user cancel confirmation', () => {
                expect(DevicesService.delete).not.toHaveBeenCalled;
            });
        });

        describe('should remove sensor if user confirms', () => {
            beforeEach(() => {
                DevicesService.delete.and.returnValues(Observable.of(1));
                DialogService.confirm.and.returnValue(Observable.of(true));
                sut.remove();
            });

            it('should remove sensor', () => {
                expect(DevicesService.delete).toHaveBeenCalledWith(sensorMock);
            });

            it('should navigate to the list of sensors on remove', () => {
                expect(Router.navigate).toHaveBeenCalledWith(['/devices']);
            });
        });

    });

    describe('#onExecutorChanged', () => {
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

    describe('#onServoChanged', () => {
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
    });
});
