import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/Rx';

describe('Login component', () => {
    let sut;
    let authService;
    let router;
    let activateRoute;
    let windowRef;
    let window;

    function createComponent() {
        return new LoginComponent(authService, router, activateRoute, windowRef);
    }

    beforeEach(() => {
        authService = {
            login: jasmine.createSpy('login')
        };
        router = {
            navigate: jasmine.createSpy('navigate')
        };
        activateRoute = {
            params: Observable.of({})
        };
        windowRef = {
            nativeWindow: window
        };
        window = {
            location: {
                href: null
            }
        };

    });

    describe('constructor', () => {
        it('should show FB login error for URL with parameter', () => {
            // Spies & stubs
            activateRoute.params = Observable.of({
                error: 'fb-error'
            });

            // Run
            sut = createComponent();

            // Expect
            expect(sut.fbLoggingError).toBe(true)
        });

        describe('should not show FB login error', () => {
            it('for URL without parameter', () => {
                // Spies & stubs
                activateRoute.params = Observable.of({});

                // Run
                sut = createComponent();

                // Expect
                expect(sut.fbLoggingError).toBe(false);
            });

            it('for URL with another parameter value', () => {
                // Spies & stubs
                activateRoute.params = Observable.of({
                    error: 'xxx-error'
                });

                // Run
                sut = createComponent();

                // Expect
                expect(sut.fbLoggingError).toBe(false);
            });
        });
    });

    describe('methods', () => {
        beforeEach(() => {
            sut = createComponent();
        });

        describe('login', () => {
            let credentials;

            beforeEach(() => {
                credentials = {
                    email: 'valid@valid.com',
                    password: 'valid-pass'
                };
                authService.login.and.returnValue(Observable.of(1));
                sut.credentials = credentials;
                sut.login();
            });

            it('should make atempt to login user with provided credentials', () => {
                expect(authService.login).toHaveBeenCalledWith(credentials);
            });

            it('should navigate to home page on success', () => {
                expect(router.navigate).toHaveBeenCalledWith(['/']);
            });

            describe('on fail login', () => {
                beforeEach(() => {
                    authService.login.and.returnValue(Observable.throw('error'));
                    sut.login();
                });

                it('should notify about error', () => {
                    expect(sut.loggingError).toBeTruthy();
                });
            });
        });

        describe('FB login', () => {
            it('should redirect to FB auth page', () => {
                sut.loginFb();
                expect(windowRef.nativeWindow.location.href).toBe(sut.fbLoginUrl);
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
});
