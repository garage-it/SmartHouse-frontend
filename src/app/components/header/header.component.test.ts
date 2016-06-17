import { HeaderComponent } from './header.component';
import * as routes from './../../routes';

const mockedRoutes = [
    {path: '/test1', name: 'Test1', component: () => {}},
    {path: '/', name: 'Test2', component: () => {}, useAsDefault: true, headerName: 'Test2 Main'},
    {path: '/test3', name: 'Test3', component: () => {}, headerName: 'Test3'},
    {path: '/test4', name: 'Test4', component: () => {}},
    {path: '/test5', name: 'Test5', component: () => {}, headerName: 'Test5'},
    {path: '/test6', name: 'Test6', component: () => {}, useAsDefault: true, headerName: 'Test6'}
];

describe('HeaderComponent', () => {
    let sut;

    beforeEach(() => {
        routes.default = mockedRoutes;
        sut = new HeaderComponent();
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    describe('routes', () => {
        const mainPage = mockedRoutes[1];
        const expectedNavigationRoutes = mockedRoutes
          .filter(route => route.headerName && !route.useAsDefault);
        const allHeaderRoutes = expectedNavigationRoutes.concat(mockedRoutes
          .filter(route => route.useAsDefault));

        it('should contain image path', () => {
            expect(allHeaderRoutes.every(route => route.iconImage)).toBe(true);
        });

        it('image path should be a string', () => {
            expect(allHeaderRoutes.every(route => typeof route.iconImage === 'string')).toBe(true);
        });

        describe('for mainPageRoute', () => {
            it('should return one route object', () => {
                expect(sut.mainPageRoute).toEqual(mainPage);
            });

            it('should contain headerName property with displayed name', () => {
                expect(sut.mainPageRoute.headerName).toBe(mainPage.headerName);
            });

            it('should contain useAsDefault property which are equal true', () => {
                expect(sut.mainPageRoute.useAsDefault).toBe(true);
            });
        });

        describe('for navigationRoutes', () => {
            it('each route should contain headerName property', () => {
                expect(sut.navigationRoutes.every(route => route.headerName)).toBe(true);
            });

            it('should return correct count of navigationRoutes', () => {
                expect(sut.navigationRoutes.length).toBe(expectedNavigationRoutes.length);
            });

            it('should return routes from collection except main page route', () => {
                expect(sut.navigationRoutes).toEqual(expectedNavigationRoutes);
            });
        });
    });
});
