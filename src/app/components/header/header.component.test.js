import {
    HeaderComponent,
    NAVIGATION_ROUTES
} from './header.component';

describe('HeaderComponent', () => {
    let sut;

    beforeEach(() => {
        sut = new HeaderComponent();
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should return main page route', () => {
        const mainPageRoute = {
            name: 'dashboard',
            headerName: 'Smart House',
            iconImage: './assets/Index.png'
        };
        expect(sut.mainPageRoute).toEqual(mainPageRoute);
    });

    it('should return navigation routes', () => {
        expect(sut.navigationRoutes).toEqual(NAVIGATION_ROUTES);
    });
});
