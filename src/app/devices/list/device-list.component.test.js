import SensorDetailService from '../details/sensor-detail.service';
import {DeviceList} from './device-list.component';

import {beforeEachProviders} from '@angular/core/testing';
import {provide} from '@angular/core';

class ObservableSubscribe {
    constructor(data = {}) {
        this._data = data;
    }
    subscribe(fn) { return fn(this._data); }
}

class SensorDetailServiceMock {
    get() { return new ObservableSubscribe(); }
    delete(data) { return new ObservableSubscribe(data); }
}

describe('device-list component', () => {
    let sut;
    let sensorsService;
    let listData;
    let numberArr;

    beforeEachProviders(() => [
        provide(SensorDetailService, {useClass: SensorDetailServiceMock})
    ]);

    beforeEach(() => {
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
        sensorsService = new SensorDetailServiceMock();
        sut = new DeviceList(sensorsService);

        spyOn(sensorsService, 'get').and.callThrough();
        spyOn(sensorsService, 'delete').and.callThrough();
    });


    describe('#init', () => {
        it('should fetch list of sensors', () => {
            sut.ngOnInit();
            expect(sut.sensorsService.get).toHaveBeenCalled();
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

        it('should NOT call sensor service if user does not confirm device delete', () => {
            const mockedSensor = {_id: 'mock'};
            spyOn(window, 'confirm').and.returnValue(false);
            sut.removeSensor(mockedSensor);

            expect(sut.sensorsService.delete).not.toHaveBeenCalledWith(mockedSensor);
        });

        describe('After user confirmation', () => {
            beforeEach(() => {
                spyOn(window, 'confirm').and.returnValue(true);
            });

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
