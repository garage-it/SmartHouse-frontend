import { UserComponent } from './user.component';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../header-navigation-routes';

describe('User', () => {
    let sut;
    let profileService;

    beforeEach(() => {
        profileService = {
            getUserName: jasmine.createSpy('getUserName')
        };
        sut = new UserComponent(profileService);
    });

    describe('routing', () => {
        it('should show log in route', () => {
            expect(sut.loginRoute).toEqual(LOGIN_ROUTE);
        });

        it('should show registration route', () => {
            expect(sut.registrationRoute).toEqual(REGISTRATION_ROUTE);
        });
    });

    describe('user information', () => {
        it('should get user name', () => {
            profileService.getUserName.and.returnValue('username');
            expect(sut.userName).toEqual('username');
        });
    });
});
