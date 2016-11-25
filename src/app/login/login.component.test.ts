import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/Rx';

describe('Login component', () => {
    let sut;
    let authService;
    let router;
    let activateRoute;
    let location;
    let windowRef;

    function createAuthService() {
        return {
            login: jasmine.createSpy('login')
        };
    }

    function createRouter() {
        return {
            navigate: jasmine.createSpy('navigate')
        };
    }

    function createActivateRoute() {
        return {
            params: Observable.of({})
        };
    }

    function createLocation() {
        return {
            prepareExternalUrl: jasmine.createSpy('prepareExternalUrl')
        };
    }

    function createWindowRef() {
        const window = {
            location: {
                origin: null,
                href: null
            }
        };

        return {
            nativeWindow: window
        };
    }

    describe('constructor', () => {
        function createComponent() {
            return new LoginComponent(
                authService,
                router,
                activateRoute,
                location,
                windowRef
            );
        }

        beforeEach(() => {
            authService = createAuthService();
            router = createRouter();
            activateRoute = createActivateRoute();
            location = createLocation();
            windowRef = createWindowRef();
        });

        it('should show FB login error for URL with parameter', () => {
            // Spies & stubs
            activateRoute.params = Observable.of({
                error: 'fb'
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

    describe('method', () => {
        beforeEach(() => {
            authService = createAuthService();
            router = createRouter();
            activateRoute = createActivateRoute();
            location = createLocation();
            windowRef = createWindowRef();

            sut = new LoginComponent(
                authService,
                router,
                activateRoute,
                location,
                windowRef
            );
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
            const fbLoginUrlPath = '/auth/login-facebook';
            const fbLoginRedirectParam = 'redirect_uri';
            const fbCallbackUrl = '/fb-callback';
            const locationOrigin = 'http://domain.com';
            const fbLoginUrl =
                `${fbLoginUrlPath}?${fbLoginRedirectParam}=` +
                encodeURIComponent(locationOrigin + fbCallbackUrl);

            beforeEach(() => {
                windowRef.nativeWindow.location.origin = locationOrigin;
                location.prepareExternalUrl.and.returnValue(fbCallbackUrl);
                sut.loginFb();
            });

            it('should redirect to FB auth page', () => {
                expect(windowRef.nativeWindow.location.href).toBe(fbLoginUrl);
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
