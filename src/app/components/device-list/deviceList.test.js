import {DeviceListService} from './DeviceList.service';
import {DeviceList} from './deviceList.component';

describe('Device List', () => {
    let sut;
    let listData;
    let mockDeviceListService;
    let numberArr;

    beforeEach(() => {
        numberArr = [];
        listData = [
            {
                number: '1',
                status: true
            },
            {
                number: '2',
                status: false
            },
            {
                number: '3',
                status: true
            }
        ];

        mockDeviceListService = jasmine.createSpyComponent(DeviceListService);
        mockDeviceListService.getData.and.returnValue(Promise.resolve(listData));

        sut = new DeviceList(mockDeviceListService);
    });

    it('will call getData from service', () => {
        expect(mockDeviceListService.getData).toHaveBeenCalled();
    });

    it('will return correct data from service', (done) => {
        mockDeviceListService.getData().then((data) => {
            expect(sut.deviceList).toEqual(data);
            done();
        });
    });

    describe('#setSortBy', () => {
        it('will sort by number column in  ascending order', () => {
            sut.sortBy = 'number';
            sut.reverse = true;
            sut.deviceList = listData;
            sut.setSortBy('number');
            sut.deviceList.forEach((elem) => {
                numberArr.push(elem.number);
            });

            expect(numberArr).toEqual(['1', '2', '3']);
        });

        it('will sort by number column in  descending order', () => {
            sut.sortBy = 'number';
            sut.reverse = false;
            sut.deviceList = listData;
            sut.setSortBy('number');
            sut.deviceList.forEach((elem) => {
                numberArr.push(elem.number);
            });

            expect(numberArr).toEqual(['3', '2', '1']);
        });

        it('will check active sort by column', () => {
            sut.sortBy = 'status';
            expect(sut.isActive('status')).toBe(true);
            expect(sut.isActive('number')).toBe(false);
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
});
