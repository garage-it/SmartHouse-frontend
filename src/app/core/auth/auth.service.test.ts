import { AuthService } from './auth.service';

describe('AuthService', function () {
    let shHttpMock;
    let profileMock;
    let service;

    beforeEach(() => {
        shHttpMock = jasmine.createSpyObj('shHttpMock', ['post']);
        profileMock = jasmine.createSpyObj('profileMock', ['setUserData', 'removeUserData']);
        service = new AuthService(shHttpMock, profileMock);
    });

    describe('#login', () => {
        it('should login and set user data', () => {
            // Data
            const authApiUrl = '/auth/login';
            const credentials = {
                email: 'valid@valid.com',
                password: 'valid-pass'
            };
            const authLoginPostData = {
                user: {},
                token: 'test-token'
            };

            // Spies
            const httpPostObservable = {
                map(next) {
                    next(authLoginPostData);
                    return this;
                }
            };
            shHttpMock.post.and.returnValue(httpPostObservable);

            // Run
            const result = service.login(credentials);

            // Expect
            expect(result).toBe(httpPostObservable);
            expect(shHttpMock.post).toHaveBeenCalledWith(authApiUrl, credentials);
            expect(profileMock.setUserData).toHaveBeenCalledWith(authLoginPostData.user, authLoginPostData.token);
        });
    });

    describe('#logout', () => {
        it('should remove user data', () => {
            // Run
            service.logout();

            // Expect
            expect(profileMock.removeUserData).toHaveBeenCalled();
        });
    });

    describe('loginByAccessToken', () => {
        it('should login with access token and set user data', () => {
            const authWithTokenUrl = '/auth/login-facebook-with-access-token';
            const token = 'test_token';
            const authLoginPostData = {
                user: {},
                token: 'test-token'
            };

            const httpPostObservable = {
                map(next) {
                    next(authLoginPostData);
                    return this;
                }
            };

            shHttpMock.post.and.returnValue(httpPostObservable);

            // Run
            const result = service.loginByAccessToken(token);

            // Expect
            expect(result).toBe(httpPostObservable);
            expect(shHttpMock.post).toHaveBeenCalledWith(authWithTokenUrl, {access_token: token});
            expect(profileMock.setUserData).toHaveBeenCalledWith(authLoginPostData.user, authLoginPostData.token);
        });
    });
});
