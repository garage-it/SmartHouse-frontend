import { HeaderComponent } from './header.component';

import ROUTING from '../../config.routing';

const MAIN_ROUTE = {
    path: `/${ROUTING.DASHBOARD}`,
    headerName: 'Dashboard',
    iconImage: './assets/dashboard.svg',
    main: true
};

export const NAVIGATION_ROUTES = [
    { path: `/${ROUTING.DASHBOARD}`, headerName: 'Dashboard', iconImage: './assets/dashboard.svg', main: true },
    { path: `/${ROUTING.DEVICES}`, headerName: 'Devices', iconImage: './assets/deviceList.svg', isAuthorized: true },
    { path: `/${ROUTING.SCENARIOS}`, headerName: 'Scenarios', iconImage: './assets/scenarioList.png', isAuthorized: true },
    { path: `/${ROUTING.HELP}`, headerName: 'Help', iconImage: './assets/help.svg', isAuthorized: false },
    { path: `/${ROUTING.LOGIN}`, headerName: 'Login', iconImage: './assets/login.svg', isAuthorized: false },
    { path: `/${ROUTING.LOGOUT}`, headerName: 'Logout', iconImage: './assets/logout.svg', isAuthorized: true },
    { path: `/${ROUTING.REGISTRATION}`, headerName: 'Registration', iconImage: './assets/registration.svg', isAuthorized: false }
];

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
