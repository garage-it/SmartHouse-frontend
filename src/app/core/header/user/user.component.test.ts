import { UserComponent } from './user.component';

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
        it('should show login route', () => {
            expect(sut.loginRoute.path).toEqual('/login');
        });

        it('should show registration route', () => {
            expect(sut.registrationRoute.path).toEqual('/registration');
        });
    });

    describe('user information', () => {
        it('should get user name', () => {
            profileService.getUserName.and.returnValue('username');
            expect(sut.userName).toEqual('username');
        });
    });
});
