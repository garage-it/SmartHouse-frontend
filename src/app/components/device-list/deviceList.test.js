import {DeviceList} from './deviceList';

describe('Device List', () => {
    describe('#constructor', () => {
        it('should be defined', () => {
            expect(DeviceList).toBeDefined();
        });
    });

    describe('Sorting list of devices', () => {
        var list, numberArr;

        beforeEach(() => {
            list = new DeviceList();
            numberArr = [];
        });

        it('will sort by number column in  ascending order', () => {
            list.sortBy = 'number';
            list.reverse = true;
            list.setSortBy('number');
            list.deviceList.forEach((elem) => {
                numberArr.push(elem.number);
            });
            expect(numberArr).toEqual([ '0001', '0002', '0003', '0004']);
        });

        it('will sort by number column in  descending order', () => {
            list.sortBy = 'number';
            list.reverse = false;
            list.setSortBy('number');
            list.deviceList.forEach((elem) => {
                numberArr.push(elem.number);
            });

            expect(numberArr).toEqual(['0004', '0003', '0002', '0001']);
        });

        it('will check active sort by column', () => {
            list.sortBy = 'status';
            expect(list.isActive('status')).toBeTruthy();
            expect(list.isActive('number')).toBeFalsy();
        });

        it('will change sorting order to opposite on sorting by the same column', () => {
            list.reverse = false;
            list.sortBy = 'status';
            list.setSortBy('status');
            expect(list.reverse).toBeTruthy();
        });


        it('will change sorting order to ascending on sorting by different column', () => {
            list.reverse = true;
            list.sortBy = 'number';
            list.setSortBy('status');
            expect(list.reverse).toBeFalsy();
        });
    });
});
