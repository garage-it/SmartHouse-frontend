import {DeviceList} from './deviceList';

describe('Device List', () => {
    describe('Sorting list of devices', () => {
        let sut;
        let listData;
        let DeviceListService;
        let numberArr;

        beforeEach(() => {
            numberArr = [];
            listData = [
                {value: 'testValue1'},
                {value: 'testValue2'}
            ];

            DeviceListService = jasmine.createSpyObj('DeviceListService', ['getData']);
            DeviceListService.getData.and.returnValue(Promise.resolve(listData));

            sut = new DeviceList(DeviceListService);
        });

        it('will call getData from service', () => {
            expect(DeviceListService.getData).toHaveBeenCalled();
        });

        it('will return correct data from service', () => {
            DeviceListService.getData().then((data) => {
                expect(sut.deviceList).toEqual(data);
            });
        });

        it('will sort by number column in  ascending order', () => {
            sut.sortBy = 'number';
            sut.reverse = true;


            DeviceListService.getData().then(() => {
                sut.setSortBy('number');
                sut.deviceList.forEach((elem) => {
                    numberArr.push(elem.number);
                });
                expect(numberArr).toEqual(['0001', '0002', '0003', '0004']);
            });
        });

        it('will sort by number column in  descending order', () => {
            sut.sortBy = 'number';
            sut.reverse = false;

            DeviceListService.getData().then(() => {
                sut.setSortBy('number');
                sut.deviceList.forEach((elem) => {
                    numberArr.push(elem.number);
                });
                expect(numberArr).toEqual(['0004', '0003', '0002', '0001']);
            });
        });

        it('will check active sort by column', () => {
            sut.sortBy = 'status';
            expect(sut.isActive('status')).toBe(true);
            expect(sut.isActive('number')).toBe(false);
        });

        it('will change sorting order to opposite on sorting by the same column', () => {
            sut.reverse = false;
            sut.sortBy = 'status';
            DeviceListService.getData().then(() => {
                sut.setSortBy('status');
                expect(sut.reverse).toBe(true);
            });
        });

        it('will change sorting order to ascending on sorting by different column', () => {
            sut.reverse = true;
            sut.sortBy = 'number';
            DeviceListService.getData().then(() => {
                sut.setSortBy('status');
                expect(sut.reverse).toBe(false);
            });
        });
    });
});
