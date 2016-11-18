import { HeaderComponent } from './header.component';
import { NAVIGATION_ROUTES } from './header-navigation-routes';

const MAIN_ROUTE = NAVIGATION_ROUTES[0];

describe('Header', () => {
    let sut;

    beforeEach(() => {
        sut = new HeaderComponent();
        sut.routes = NAVIGATION_ROUTES;
        sut.ngOnInit();
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should return main page route', () => {
        expect(sut.mainPageRoute).toEqual(MAIN_ROUTE);
    });

    it('should return navigation routes', () => {
        expect(sut.navigationRoutes).toEqual(NAVIGATION_ROUTES);
    });
});
