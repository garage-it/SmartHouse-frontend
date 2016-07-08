import { Router } from 'angular2/router';
import {
    HeaderComponent,
    NAVIGATION_ROUTES
} from './header.component';
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
    let router;

    beforeEach(() => {
        router = jasmine.createSpyComponent(Router);
        routes.default = mockedRoutes;
        sut = new HeaderComponent(router);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should return main page route', () => {
        const mainPageRoute = {
            name: 'Dashboard',
            headerName: 'Smart House',
            iconImage: './assets/Index.png'
        };
        expect(sut.mainPageRoute).toEqual(mainPageRoute);
    });

    it('should return navigation routes', () => {
        expect(sut.navigationRoutes).toEqual(NAVIGATION_ROUTES);
    });
});
