import { HeaderComponent } from './header.component';

import ROUTING from '../../config.routing';

const MAIN_ROUTE = {
    path: `/${ROUTING.DASHBOARD}`,
    headerName: 'Dashboard',
    iconImage: './assets/dashboard.svg',
    main: true
};
const NAVIGATION_ROUTES = [
    MAIN_ROUTE,
    { path: `/${ROUTING.DEVICES}`, headerName: 'Devices', iconImage: './assets/deviceList.svg' },
    { path: `/${ROUTING.SCENARIOS}`, headerName: 'Scenarios', iconImage: './assets/scenarioList.png' },
    { path: `/${ROUTING.HELP}`, headerName: 'Help', iconImage: './assets/help.svg' },
    { path: `/${ROUTING.LOGIN}`, headerName: 'Login', iconImage: './assets/login.svg' },
    { path: `/${ROUTING.LOGOUT}`, headerName: 'Logout', iconImage: './assets/logout.svg' }
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
