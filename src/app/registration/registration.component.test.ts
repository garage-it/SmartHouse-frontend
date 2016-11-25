import { RegistrationComponent } from './registration.component';
import { Observable } from 'rxjs/Rx';

describe('Registration component', () => {
    let sut;
    let router;
    let AuthService;

    beforeEach(() => {
        AuthService = {
            register: jasmine.createSpy('register')
        };
        router = {
            navigate: jasmine.createSpy('navigate')
        };
        sut = new RegistrationComponent(AuthService, router);
    });

    describe('save', () => {
        let user;

        beforeEach(() => {
            user = {
                username: 'validname',
                email: 'valid@valid.com',
                password: 'valid-pass',
                passwordConfirm: 'valid-pass'
            };
            AuthService.register.and.returnValue(Observable.of(1));
            sut.user = user;
            sut.save();
        });

        it('should make atempt to register user with provided user', () => {
            expect(AuthService.register).toHaveBeenCalledWith(user);
        });

        it('should navigate to home page on success', () => {
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        describe('on registration fail', () => {
            let error;

            beforeEach(() => {
                error = { json: () => ({error: 'Test Error'}) };
                AuthService.register.and.returnValue(Observable.throw(error));
                sut.save();
            });

            it('should notify about error', () => {
                expect(sut.error).toBe(error.json().error);
            });
        });
    });

    describe('on component destroy', () => {
        beforeEach(() => {
            sut.registrationSubscription = {
                unsubscribe: jasmine.createSpy('register unsubscribe')
            };
            sut.ngOnDestroy();
        });

        it('should unsubscribe from register events', () => {
            expect(sut.registrationSubscription.unsubscribe).toHaveBeenCalled();
        });
    });
});
