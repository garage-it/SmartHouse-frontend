import { Observable } from 'rxjs/Rx';

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

    describe('login', () => {
        let authApiUrl;
        let credentials;
        let authLoginPostData;

        beforeEach(() => {
            authApiUrl = '/auth/login';
            credentials = {
                email: 'valid@valid.com',
                password: 'valid-pass'
            };
            authLoginPostData = {
                user: {},
                token: 'test-token'
            };

            shHttpMock.post.and.returnValue(Observable.of(authLoginPostData));

            service.login(credentials).subscribe(() => {});
        });

        it('should send auth request with credentials', () => {
            expect(shHttpMock.post).toHaveBeenCalledWith(authApiUrl, credentials);
        });

        it('should save user date and token', () => {
            expect(profileMock.setUserData).toHaveBeenCalledWith(authLoginPostData.user, authLoginPostData.token);
        });
    });

    describe('logout', () => {
        beforeEach(() => {
            service.logout();
        });

        it('should remove user data', () => {
            expect(profileMock.removeUserData).toHaveBeenCalled();
        });
    });

    describe('loginByAccessToken', () => {
        let authWithTokenUrl;
        let token;
        let authLoginPostData;

        beforeEach(() => {
            authWithTokenUrl = '/auth/login-facebook-with-access-token';
            token = 'test_token';
            authLoginPostData = {
                user: {},
                token: 'test-token'
            };

            shHttpMock.post.and.returnValue(Observable.of(authLoginPostData));

            service.loginByAccessToken(token).subscribe(() => {});
        });

        it('should send auth request with access token', () => {
            expect(shHttpMock.post).toHaveBeenCalledWith(authWithTokenUrl, {access_token: token});
        });

        it('should set user data', () => {
            expect(profileMock.setUserData).toHaveBeenCalledWith(authLoginPostData.user, authLoginPostData.token);
        });

    });
});
