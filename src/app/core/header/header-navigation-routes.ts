import { NavigationRoute } from './navigation-route.model';
import ROUTING from '../../config.routing';

export const NAVIGATION_ROUTES: Array<NavigationRoute> = [
    {path: `/${ROUTING.DASHBOARD}`, headerName: 'Dashboard', iconImage: './assets/dashboard.svg'},
    {path: `/${ROUTING.DEVICES}`, headerName: 'Devices', iconImage: './assets/deviceList.svg'},
    {path: `/${ROUTING.SCENARIOS}`, headerName: 'Scenarios', iconImage: './assets/scenarioList.png'},
    {path: `/${ROUTING.HELP}`, headerName: 'Help', iconImage: './assets/help.svg'},
    {path: `/${ROUTING.LOGIN}`, headerName: 'Login', iconImage: './assets/login.svg'},
    {path: `/${ROUTING.LOGOUT}`, headerName: 'Logout', iconImage: './assets/logout.svg'},
    {path: `/${ROUTING.REGISTRATION}`, headerName: 'Registration', iconImage: './assets/registration.svg'}
];

export const MAIN_ROUTE: NavigationRoute = {path: `/${ROUTING.BASE}`};
