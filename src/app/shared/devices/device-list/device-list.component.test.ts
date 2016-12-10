import { DeviceListComponent } from './device-list.component';
import { Observable } from 'rxjs';

describe('device-list', () => {
    let sut;
    let DevicesService;
    let DialogService;
    let ViewContainerRef;
    let listData;
    let numberArr;

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

        DevicesService = {
            delete: jasmine.createSpy('delete')
        };

        DialogService = {
            confirm: jasmine.createSpy('confirm')
        };

        ViewContainerRef = {};

        sut = new DeviceListComponent(DevicesService, DialogService, ViewContainerRef);
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
            const confirmOptions = {
                title: '',
                message: 'Are you sure you want to delete this device?'
            };

            beforeEach(() => {
                DialogService.confirm = jasmine.createSpy('mdDialogMock.confirm').and.returnValue(Observable.of(false));
            });

            it('should show confirm dialog with view container ref and options', () => {
                sut.removeSensor();
                expect(DialogService.confirm).toHaveBeenCalledWith(ViewContainerRef, confirmOptions);
            });

            it('should NOT call sensor service if user does not confirm device delete', () => {
                const mockedSensor = {_id: 'mock'};

                sut.removeSensor(mockedSensor);

                expect(DevicesService.delete).not.toHaveBeenCalledWith(mockedSensor);
            });
        });

        describe('After user confirmation', () => {
            let mockedSensor;

            beforeEach(() => {
                mockedSensor = listData[1];
                DialogService.confirm.and.returnValue(Observable.of(true));
                DevicesService.delete.and.returnValue(Observable.of(mockedSensor));

                sut.deviceList = listData;
                sut.removeSensor(mockedSensor);
            });

            it('should call sensor service', () => {
                expect(DevicesService.delete).toHaveBeenCalledWith(mockedSensor);
            });

            it('should remove sensor from listData', () => {
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
