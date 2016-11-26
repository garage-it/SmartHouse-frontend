import { ProtectedComponent } from './protected.component';

describe('Protected Component', () => {
    let sut;
    let ProfileService;

    beforeEach(() => {
        ProfileService = {
            isLoggedIn: jasmine.createSpy('isLoggedIn'),
            hasUserRole: jasmine.createSpy('hasUserRole'),
            isGuest: jasmine.createSpy('isGuest'),
            getUserRole: jasmine.createSpy('getUserRole')
        };
        sut = new ProtectedComponent(ProfileService);
    });

    describe('authorized user', () => {
        beforeEach(() => {
            sut.isAuthorized = true;
            sut.roles = ['admin'];
            ProfileService.getUserRole.and.returnValue('admin');
            ProfileService.isLoggedIn.and.returnValue(true);
        });

        it('with right role should be allowed', () => {
            ProfileService.hasUserRole.and.returnValue(true);
            expect(sut.allowed).toEqual(true);
        });

        it('with transmitted empty roles should be allowed for any roles', () => {
            ProfileService.hasUserRole.and.returnValue(true);
            expect(sut.allowed).toEqual(true);
        });

        it('without transmitted roles should be allowed for any roles', () => {
            ProfileService.hasUserRole.and.returnValue(true);
            expect(sut.allowed).toEqual(true);
        });

        it('with incorrect role shouldn\'t be allowed', () => {
            ProfileService.hasUserRole.and.returnValue(false);
            expect(sut.allowed).toEqual(false);
        });
    });

    describe('for unauthorized user', () => {
        beforeEach(() => {
            ProfileService.isLoggedIn.and.returnValue(false);
            ProfileService.isGuest.and.returnValue(true);
            sut.isAuthorized = false;
        });

        it('should be allowed as guest', () => {
            expect(sut.allowed).toEqual(true);
        });
    });
});
