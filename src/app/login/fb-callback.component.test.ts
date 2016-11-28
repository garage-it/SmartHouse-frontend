import { FbCallbackComponent } from './fb-callback.component';
import { Observable } from 'rxjs/Rx';

describe('FbCallback component', () => {
    let authService;
    let router;
    let windowRef;
    let sut;

    beforeEach(() => {
        authService = {
            loginByAccessToken: jasmine.createSpy('loginByAccessToken')
        };
        router = {
            navigate: jasmine.createSpy('navigate')
        };
        windowRef = {
            nativeWindow: {
                location: {
                    hash: null
                }
            }
        };

        sut = new FbCallbackComponent(
            windowRef,
            authService,
            router
        );
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.parseAccessToken =  jasmine.createSpy('parseAccessToken');
        });

        describe('without access token', () => {
            beforeEach(() => {
                sut.ngOnInit();
            });

            it('should parse token', () => {
                expect(sut.parseAccessToken).toHaveBeenCalled();
            });

            it('should navigate to error page', () => {
                expect(router.navigate).toHaveBeenCalledWith(['/login/error/fb']);
            });
        });

        describe('with access token', () => {
            beforeEach(() => {
                sut.parseAccessToken.and.returnValue('AAA');
                sut.authService.loginByAccessToken.and.returnValue(Observable.of(1));

                sut.ngOnInit();
            });

            it('should call parseAccessToken', () => {
                expect(sut.parseAccessToken).toHaveBeenCalled();
            });

            it('should call loginByAccessToken', () => {
                expect(sut.authService.loginByAccessToken).toHaveBeenCalledWith('AAA');
            });

            it('should navigate to home page on success', () => {
                expect(router.navigate).toHaveBeenCalledWith(['/']);
            });
        });

        describe('with failed authService response', () => {
            beforeEach(() => {
                sut.parseAccessToken.and.returnValue('AAA');
                sut.authService.loginByAccessToken.and.returnValue(Observable.throw('error'));

                sut.ngOnInit();
            });

            it('should navigate to error page', () => {
                expect(router.navigate).toHaveBeenCalledWith(['/login/error/fb']);
            });
        });
    });

    describe('parseAccessToken', () => {
        describe('with hash with access token', () => {
            beforeEach(() => {
                windowRef.nativeWindow.location.hash = '#access_token=ttRRvb';
            });

            it('should match hash successfully', () => {
                expect(sut.parseAccessToken()).toEqual('ttRRvb');
            });
        });

        describe('with hash without access token', () => {
            beforeEach(() => {
                windowRef.nativeWindow.location.hash = '#error=error-message';
            });

            it('should return null', () => {
                expect(sut.parseAccessToken()).toEqual(null);
            });
        });
    });

    describe('ngOnDestroy', () => {
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
