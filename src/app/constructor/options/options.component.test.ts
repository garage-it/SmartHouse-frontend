import { OptionsComponent } from './options.component';

describe('Home', () => {
    let sut;
    const defaultSubview = Symbol('default');

    beforeEach(() => {
        sut = new OptionsComponent();
        sut.defaultSubviewChange.emit = jasmine.createSpy('change');
    });

    describe('defaultSubview', () => {
        beforeEach(() => {
            sut.defaultSubview = defaultSubview;
        });

        it('should able to set and get defaultSubview', () => {
            expect(sut.defaultSubview).toEqual(defaultSubview);
        });

        it('should emit defaultSubview value on change', () => {
            expect(sut.defaultSubviewChange.emit).toHaveBeenCalledWith(defaultSubview);
        });
    });
});
