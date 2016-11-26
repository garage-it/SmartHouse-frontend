import { NavigationRoute } from './navigation-route.model';
import ROUTING from '../../config.routing';

export const NAVIGATION_ROUTES: Array<NavigationRoute> = [
    {path: `/${ROUTING.DASHBOARD}`, headerName: 'Dashboard', iconImage: './assets/dashboard.svg'},
    {path: `/${ROUTING.DEVICES}`, headerName: 'Devices', iconImage: './assets/deviceList.svg', isAuthorized: true},
    {path: `/${ROUTING.SCENARIOS}`, headerName: 'Scenarios', iconImage: './assets/scenarioList.png', isAuthorized: true},
    {path: `/${ROUTING.STATISTIC}`, headerName: 'Statistic', iconImage: './assets/statistic.svg', isAuthorized: true},
    {path: `/${ROUTING.HELP}`, headerName: 'Help', iconImage: './assets/help.svg', isAuthorized: false},
    {path: `/${ROUTING.LOGIN}`, headerName: 'Login', iconImage: './assets/login.svg', isAuthorized: false},
    {path: `/${ROUTING.LOGOUT}`, headerName: 'Logout', iconImage: './assets/logout.svg', isAuthorized: true },
    {path: `/${ROUTING.REGISTRATION}`, headerName: 'Registration', iconImage: './assets/registration.svg', isAuthorized: false}
];

export const MAIN_ROUTE: NavigationRoute = {path: `/${ROUTING.BASE}`};
