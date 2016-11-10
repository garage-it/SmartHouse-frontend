import { async, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';

import { SensorDetailService } from '../shared/sensor-detail.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { DeviceListComponent } from './device-list.component';
import { Observable } from 'rxjs';

class SensorDetailServiceMock {
    delete(data) {
        return Observable.of(data);
    }
}

class DialogServiceMock {
    confirm(data) {
        return Observable.of(data);
    }
}

const mockDeviceListComponent = ['some data'];

class ActivatedRouteMock {
    private data: Observable<any>;
    constructor() {
        this.data = Observable.of({deviceList: mockDeviceListComponent});
    }
}

describe('device-list', () => {
    let sut;
    let sensorsService;
    let dialogService;
    let listData;
    let numberArr;
    let activatedRouteMock;
    let observable;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DeviceListComponent ],
            providers: [
                {provide: SensorDetailService, useClass: SensorDetailServiceMock },
                {provide: DialogService, useClass: DialogServiceMock },
                {provide: ActivatedRoute, useClass: ActivatedRouteMock}
            ]
        })
        .overrideComponent(DeviceListComponent, {
            set: {template: 'mocked template'}
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.createComponent(DeviceListComponent).componentInstance;
            activatedRouteMock = TestBed.get(ActivatedRoute);
            sensorsService = TestBed.get(SensorDetailService);
            dialogService = TestBed.get(DialogService);

            numberArr = [];
            listData = [
                {
                    _id: '1',
                    mqttId: '1',
                    type: 'some type',
                    description: 'some description'
                },
                {
                    _id: '2',
                    mqttId: '2',
                    type: 'some other type',
                    description: 'some other description'
                }
            ];

            spyOn(sensorsService, 'delete').and.callThrough();
            spyOn(dialogService, 'confirm').and.callThrough();
            spyOn(activatedRouteMock.data, 'subscribe').and.callThrough();
        });
    }));


    describe('#init', () => {
        it('should fetch list of sensors', () => {
            sut.ngOnInit();
            expect(activatedRouteMock.data.subscribe).toHaveBeenCalled();
        });
        it('should take list data from activatedRouteMock', () => {
            sut.ngOnInit();
            expect(mockDeviceListComponent).toEqual(sut.deviceList);
        });
    });

    describe('#headers', () => {
        const allowedHeaders = [
            { topic: 'mqttId', name: 'ID', sortable: true },
            { topic: 'type', name: 'ID', sortable: false },
            { topic: 'description', name: 'ID', sortable: true },
        ];

        it('should have collection of allowed headers: mqttId, type, description', () => {
            sut._headers = allowedHeaders;
            expect(sut.headers).toEqual(allowedHeaders);
        });
    });

    describe('#removeSensor', () => {
        it('should be defined', () => {
            expect(sut.removeSensor).toBeDefined();
        });

        describe('before user confirmation', () => {
            beforeEach(() => {
                observable = Observable.create(observer => {
                    observer.next();
                    observer.complete();
                });

                dialogService.confirm = jasmine.createSpy('mdDialogMock.confirm').and.returnValue(observable);
            });

            it('should show confirm dialog', () => {
                sut.removeSensor();
                expect(dialogService.confirm).toHaveBeenCalled();
            });

            it('should NOT call sensor service if user does not confirm device delete', () => {
                const mockedSensor = {_id: 'mock'};

                sut.removeSensor(mockedSensor);

                expect(sut.sensorsService.delete).not.toHaveBeenCalledWith(mockedSensor);
            });
        });

        describe('After user confirmation', () => {
            it('should call sensor service', () => {
                const mockedSensor = {_id: 'mock'};
                sut.removeSensor(mockedSensor);

                expect(sut.sensorsService.delete).toHaveBeenCalledWith(mockedSensor);
            });

            it('should remove sensor from listData', () => {
                sut.deviceList = listData;
                sut.removeSensor(listData[1]);

                expect(sut.deviceList).toEqual([listData[0]]);
            });
        });
    });

    describe('#setSortBy', () => {
        it('will sort by number column in  ascending order', () => {
            sut.sortBy = 'mqttId';
            sut.reverse = true;
            sut.deviceList = listData;
            sut.setSortBy('mqttId');
            sut.deviceList.forEach((elem) => {
                numberArr.push(elem.mqttId);
            });

            expect(numberArr).toEqual(['1', '2']);
        });

        it('will sort by number column in  descending order', () => {
            sut.sortBy = 'mqttId';
            sut.reverse = false;
            sut.deviceList = listData;
            sut.setSortBy('mqttId');
            sut.deviceList.forEach((elem) => {
                numberArr.push(elem.mqttId);
            });

            expect(numberArr).toEqual(['2', '1']);
        });

        it('will change sorting order to opposite on sorting by the same column', () => {
            sut.reverse = false;
            sut.sortBy = 'status';
            sut.deviceList = listData;
            sut.setSortBy('status');
            expect(sut.reverse).toBe(true);
        });

        it('will change sorting order to ascending on sorting by different column', () => {
            sut.reverse = true;
            sut.sortBy = 'number';
            sut.deviceList = listData;
            sut.setSortBy('status');
            expect(sut.reverse).toBe(false);
        });
    });

    describe('#isActive', () => {
        it('will check active sort by column', () => {
            sut.sortBy = 'status';
            expect(sut.isActive('status')).toBe(true);
            expect(sut.isActive('mqttId')).toBe(false);
        });
    });
});
