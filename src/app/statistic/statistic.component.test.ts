import { StatisticComponent } from './statistic.component';
import { Observable } from 'rxjs';

describe('statistic page', () => {
    let sut;
    let ActivatedRoute;
    let deviceList;

    beforeEach(() => {
        deviceList = ['some data'];

        ActivatedRoute = {
            data: Observable.of({ deviceList })
        };

        sut = new StatisticComponent(ActivatedRoute);
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
