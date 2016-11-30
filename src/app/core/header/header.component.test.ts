import { HeaderComponent } from './header.component';
import { NAVIGATION_ROUTES, MAIN_ROUTE } from './header-navigation-routes';

describe('Header', () => {
    let sut;

    beforeEach(() => {
        sut = new HeaderComponent();
    });

    it('should show main page route', () => {
        expect(sut.mainPageRoute).toEqual(MAIN_ROUTE);
    });

    it('should show navigation routes', () => {
        expect(sut.navigationRoutes).toEqual(NAVIGATION_ROUTES);
    });
});
