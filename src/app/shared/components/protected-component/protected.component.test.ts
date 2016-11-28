import { ProtectedComponent } from './protected.component';

describe('Protected Component', () => {
    let sut;
    let profileService;

    beforeEach(() => {
        profileService = {
            isLoggedIn: jasmine.createSpy('isLoggedIn'),
            isUserRoleIn: jasmine.createSpy('isUserRoleIn'),
            isGuest: jasmine.createSpy('isGuest'),
            getUserRole: jasmine.createSpy('getUserRole')
        };
        sut = new ProtectedComponent(profileService);
    });

    describe('authorized user', () => {
        beforeEach(() => {
            sut.isAuthorized = true;
            sut.roles = ['admin'];
            profileService.getUserRole.and.returnValue('admin');
            profileService.isLoggedIn.and.returnValue(true);
        });

        it('with right role should be allowed', () => {
            profileService.isUserRoleIn.and.returnValue(true);
            expect(sut.allowed).toEqual(true);
        });

        it('with transmitted empty roles should be allowed for any roles', () => {
            profileService.isUserRoleIn.and.returnValue(true);
            expect(sut.allowed).toEqual(true);
        });

        it('without transmitted roles should be allowed for any roles', () => {
            profileService.isUserRoleIn.and.returnValue(true);
            expect(sut.allowed).toEqual(true);
        });

        it('with incorrect role shouldn\'t be allowed', () => {
            profileService.isUserRoleIn.and.returnValue(false);
            expect(sut.allowed).toEqual(false);
        });
    });

    describe('for unauthorized user', () => {
        beforeEach(() => {
            profileService.isLoggedIn.and.returnValue(false);
            profileService.isGuest.and.returnValue(true);
            sut.isAuthorized = false;
        });

        it('should be allowed as guest', () => {
            expect(sut.allowed).toEqual(true);
        });
    });
});
