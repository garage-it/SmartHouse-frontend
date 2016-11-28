import { EqualToDirective } from './equal-to.directive';

describe('EqualTo directive', () => {
    let sut;
    let formControl;

    beforeEach(() => {
        formControl = {
            setErrors: jasmine.createSpy('setErrors'),
            value: 'testPassword'
        };
        sut = new EqualToDirective();
    });

    describe('validate', () => {
        beforeEach(() => {
            sut.equalTo = 'testPassword';
        });

        it('should return positive result when compared values are equal', () => {
            expect(sut.validate(formControl)).toBeNull();
        });

        it('should return errors when compared values are not equal', () => {
            formControl.value = 'wrongPassword';

            expect(sut.validate(formControl)).toEqual(sut.invalidResult);
        });
    });

    describe('on changes of value, which is compared to', () => {
        beforeEach(() => {
            sut.equalTo = 'testPasswordUpdated';
            sut.control = formControl;
            sut.ngOnChanges({equalTo: true});
        });

        it('should set validation result to targeted form control', () => {
            expect(formControl.setErrors).toHaveBeenCalledWith(sut.invalidResult);
        });
    });
});
