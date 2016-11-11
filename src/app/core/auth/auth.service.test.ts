import { AuthService } from './auth.service';

fdescribe('AuthService', function () {
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
});
