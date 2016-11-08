import { HeaderComponent } from './header.component';

const MAIN_ROUTE = {
    path: '/dashboard',
    headerName: 'Dashboard',
    iconImage: './assets/dashboard.svg',
    main: true
};
const NAVIGATION_ROUTES = [
    MAIN_ROUTE,
    { path: '/devices', headerName: 'Devices', iconImage: './assets/deviceList.svg' },
    { path: '/scenarios', headerName: 'Scenarios', iconImage: './assets/scenarioList.png' },
    { path: '/help', headerName: 'Help', iconImage: './assets/help.svg' }
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
