import { DeviceListComponent } from './device-list.component';
import { Observable } from 'rxjs';

describe('device-list', () => {
    let sut;
    let DevicesService;
    let DialogService;
    let ViewContainerRef;
    let Router;
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

        Router = {
            navigate: jasmine.createSpy('navigate')
        };

        DevicesService = {
            delete: jasmine.createSpy('delete')
        };

        DialogService = {
            confirm: jasmine.createSpy('confirm')
        };

        ViewContainerRef = {};

        sut = new DeviceListComponent(DevicesService, DialogService, ViewContainerRef, Router);
    });

    it('should not show statistic link by default', () => {
        expect(sut.statisticLink).toEqual(false);
    });

    it('should show delete device button by default', () => {
        expect(sut.showDeleteButton).toEqual(true);
    });

    it('should navigate to device edit page on item click by default', () => {
        expect(sut.editOnItemClick).toEqual(true);
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

    describe('#goToDeviceStatistic', () => {
        let event;
        const mqttId = Symbol('device id to show statistic');
        const statisticLink = 'path to statistic';

        beforeEach(() => {
            event = {
                stopPropagation: jasmine.createSpy('stopPropagation')
            };
            sut.statisticLink = statisticLink;

            sut.goToDeviceStatistic(mqttId, event);
        });

        it('should stop event propagation', () => {
            expect(event.stopPropagation).toHaveBeenCalled();
        });

        it('should navigate to statistic of proder device', () => {
            expect(Router.navigate).toHaveBeenCalledWith([statisticLink, mqttId, 'day']);
        });
    });

    describe('#removeSensor', () => {
        let event;
        let mockedSensor;

        beforeEach(() => {
            mockedSensor = listData[1];
            event = {
                stopPropagation: jasmine.createSpy('stopPropagation')
            };
        });

        describe('before user confirmation', () => {
            const confirmOptions = {
                title: '',
                message: 'Are you sure you want to delete this device?'
            };

            beforeEach(() => {
                DialogService.confirm = jasmine.createSpy('mdDialogMock.confirm').and.returnValue(Observable.of(false));
                sut.removeSensor(mockedSensor, event);
            });

            it('should stop event propagation', () => {
                expect(event.stopPropagation).toHaveBeenCalled();
            });

            it('should show confirm dialog with view container ref and options', () => {
                expect(DialogService.confirm).toHaveBeenCalledWith(ViewContainerRef, confirmOptions);
            });

            it('should NOT call sensor service if user does not confirm device delete', () => {
                expect(DevicesService.delete).not.toHaveBeenCalledWith(mockedSensor);
            });
        });

        describe('After user confirmation', () => {
            beforeEach(() => {
                mockedSensor = listData[1];
                DialogService.confirm.and.returnValue(Observable.of(true));
                DevicesService.delete.and.returnValue(Observable.of(mockedSensor));

                sut.deviceList = listData;
                sut.removeSensor(mockedSensor, event);
            });

            it('should call sensor service', () => {
                expect(DevicesService.delete).toHaveBeenCalledWith(mockedSensor);
            });

            it('should remove sensor from listData', () => {
                expect(sut.deviceList).toEqual([listData[0]]);
            });
        });
    });

    describe('#getItemEditLink', () => {
        const deviceId = Symbol('passed device id');

        it('should go to device edit page if allowed', () => {
            sut.editOnItemClick = true;

            expect(sut.getItemEditLink(deviceId)).toEqual(['./', deviceId]);
        });

        it('should go stay on current page on item click if option is NOT allowed', () => {
            sut.editOnItemClick = false;

            expect(sut.getItemEditLink(deviceId)).toEqual([]);
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
