import { HeaderComponent } from './header.component';
import { NAVIGATION_ROUTES, MAIN_ROUTE } from './header-navigation-routes';

describe('Header', () => {
    let sut;
    let profile;

    beforeEach(() => {
        profile = jasmine.createSpyObj('profile', ['isGuest']);
        sut = new HeaderComponent(profile);
    });

    it('should show main page route', () => {
        expect(sut.mainPageRoute).toEqual(MAIN_ROUTE);
    });

    it('should show navigation routes', () => {
        expect(sut.navigationRoutes).toEqual(NAVIGATION_ROUTES);
    });

    describe('is option hidden', () => {
        let route;

        beforeEach(() => {
            route = {
                authRequired: true
            };
            profile.isGuest.and.returnValue(true);
        });

        it('should be hidden for guest user', () => {
            expect(sut.isOptionHidden(route)).toEqual(true);
        });
    });
});
