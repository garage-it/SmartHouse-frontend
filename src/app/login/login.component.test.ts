import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/Rx';

describe('Login component', () => {
    let sut;
    let AuthService;
    let router;
    let activateRoute;
    let windowRef;
    let window;

    beforeEach(() => {
        AuthService = {
            login: jasmine.createSpy('login')
        };
        router = {
            navigate: jasmine.createSpy('navigate')
        };
        activateRoute = {
            params: {
                subscribe: jasmine.createSpy('params subscribe')
            }
        };
        windowRef = {
            nativeWindow: window
        };
        window = {
            location: {
                href: null
            }
        };
        sut = new LoginComponent(AuthService, router, activateRoute, windowRef);
    });

    describe('login', () => {
        let credentials;

        beforeEach(() => {
            credentials = {
                email: 'valid@valid.com',
                password: 'valid-pass'
            };
            AuthService.login.and.returnValue(Observable.of(1));
            sut.credentials = credentials;
            sut.login();
        });

        it('should make atempt to login user with provided credentials', () => {
            expect(AuthService.login).toHaveBeenCalledWith(credentials);
        });

        it('should navigate to home page on success', () => {
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        });

        describe('on fail login', () => {
            beforeEach(() => {
                AuthService.login.and.returnValue(Observable.throw('error'));
                sut.login();
            });

            it('should notify about error', () => {
                expect(sut.loggingError).toBeTruthy();
            });
        });
    });

    describe('on component destroy', () => {
        beforeEach(() => {
            sut.loginSubscription = {
                unsubscribe: jasmine.createSpy('login unsubscribe')
            };
            sut.ngOnDestroy();
        });

        it('should unsubscribe from login events', () => {
            expect(sut.loginSubscription.unsubscribe).toHaveBeenCalled();
        });
    });
});
