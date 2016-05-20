import DeviceListService from '../shared/device-list.service';
import {DeviceList} from './device-list.component';

import {beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

const observableSubscribe = {
    subscribe() {}
};

class DeviceListServiceMock {
    getSensors() {
        return observableSubscribe;
    }
}

describe('device-list component', () => {
    let sut;
    let deviceListService;
    let listData;
    let numberArr;

    beforeEachProviders(() => [
        provide(DeviceListService, {useClass: DeviceListServiceMock})
    ]);

    beforeEach(() => {
        numberArr = [];
        listData = [
            {
                mqttId: '1',
                type: 'some type',
                description: 'some description',
                status: false
            },
            {
                mqttId: '2',
                type: 'some other type',
                description: 'some other description',
                status: true
            }
        ];

        deviceListService = new DeviceListServiceMock();
        spyOn(deviceListService, 'getSensors').and.callThrough();
        sut = new DeviceList(deviceListService);
    });


    describe('#init', () => {
        it('should fetch list of sensors', () => {
            sut.ngOnInit();
            expect(sut.deviceListService.getSensors).toHaveBeenCalled();
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
