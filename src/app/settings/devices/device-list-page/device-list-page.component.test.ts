import { DeviceListPageComponent } from './device-list-page.component';
import { Observable } from 'rxjs';

describe('device list page', () => {
    let sut;
    let ActivatedRoute;
    let deviceList;

    beforeEach(() => {
        deviceList = ['some data'];

        ActivatedRoute = {
            data: Observable.of({ deviceList })
        };

        sut = new DeviceListPageComponent(ActivatedRoute);
    });

    describe('#init', () => {
        beforeEach(() => {
             sut.ngOnInit();
        });

        it('should take list data from activatedRouteMock', () => {
            expect(sut.deviceList).toEqual(deviceList);
        });
    });
});
