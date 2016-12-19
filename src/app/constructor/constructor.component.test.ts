import { ConstructorComponent } from './constructor.component';

describe('Home', () => {
    let sut;
    let ActivatedRoute;
    const someView = 'some view';

    beforeEach(() => {
        ActivatedRoute = {
            snapshot: {
                data: {
                    view: someView
                }
            }
        };
        sut = new ConstructorComponent(ActivatedRoute);
    });

    describe('on init', () => {
        it('should get resolved view from active route', () => {
            sut.ngOnInit();
            expect(sut.view).toEqual(someView);
        });
    });
});
