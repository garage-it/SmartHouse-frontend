import { FbCallbackComponent } from './fb-callback.component';
import { Observable } from 'rxjs/Rx';

describe('FbCallback component', () => {
    let authService;
    let router;
    let windowRef;
    let sut;

    function createAuthService() {
        return {
            loginByAccessToken: jasmine.createSpy('loginByAccessToken')
        };
    }

    function createRouter() {
        return {
            navigate: jasmine.createSpy('navigate')
        };
    }

    function createWindowRef() {
        const window = {
            location: {
                hash: null
            }
        };

        return {
            nativeWindow: window
        };
    }

    beforeEach(() => {
        authService = createAuthService();
        router = createRouter();
        windowRef = createWindowRef();

        sut = new FbCallbackComponent(
            windowRef,
            authService,
            router
        );
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.parseAccessToken =  jasmine.createSpy('parseAccessToken');
            sut.authService.loginByAccessToken =  jasmine.createSpy('loginByAccessToken');

            sut.ngOnInit();
        });

        it('should not retrieve token and navigate to error page', () => {
            expect(sut.parseAccessToken).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['login/error/fb']);
        });

        describe('ngOnIit with access token', () => {
            beforeEach(() => {
                sut.parseAccessToken.and.returnValue('AAA');
                sut.authService.loginByAccessToken.and.returnValue(Observable.of(1));

                sut.ngOnInit();
            });

            it('should call parseAccessToken within ngOnInit to retrieve token', () => {
                expect(sut.parseAccessToken).toHaveBeenCalled();
            });

            it('should call loginByAccessToken if token is found', () => {
                expect(sut.authService.loginByAccessToken).toHaveBeenCalledWith('AAA');
            });

            it('should navigate to home page on success', () => {
                expect(router.navigate).toHaveBeenCalledWith(['/']);
            });
        });

        describe('ngOnIit with failed authService response', () => {
            beforeEach(() => {
                sut.parseAccessToken.and.returnValue('AAA');
                sut.authService.loginByAccessToken.and.returnValue(Observable.throw('error'));

                sut.ngOnInit();
            });

            it('should navigate to error page', () => {
                expect(router.navigate).toHaveBeenCalledWith(['login/error/fb']);
            });
        });
    });

    describe('parseAccessToken method', () => {
        it('should match hash successfully', () => {
            windowRef.nativeWindow.location.hash = '#access_token=ttRRvb';

            expect(sut.parseAccessToken()).toEqual('ttRRvb');
        });

        it('should return null if hash is not found', () => {
            windowRef.nativeWindow.location.hash = '#acc_token=ttRRvb';

            expect(sut.parseAccessToken()).toEqual(null);
        });
    });

    describe('ngOnDestroy method', () => {
        beforeEach(() => {
            sut.subscription = {
                unsubscribe: jasmine.createSpy('authService unsubscribe')
            };
            sut.ngOnDestroy();
        });

        it('should unsubscribe from authService events', () => {
            expect(sut.subscription.unsubscribe).toHaveBeenCalled();
        });
    });
});
