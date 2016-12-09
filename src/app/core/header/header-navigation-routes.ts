import { NavigationRoute } from '../navigation-route.model';
import ROUTING from '../../config.routing';

export const NAVIGATION_ROUTES: Array<NavigationRoute> = [
    {path: `/${ROUTING.SCENARIOS}`, name: 'Scenarios', iconImage: './assets/scenarioList.png', isAuthorized: true},
    {path: `/${ROUTING.STATISTIC}`, name: 'Statistic', iconImage: './assets/statistic.svg', isAuthorized: true},
    {path: `/${ROUTING.SETTINGS}`, name: 'Settings', iconImage: './assets/settings.svg', isAuthorized: true},
    {path: `/${ROUTING.HELP}`, name: 'Help', iconImage: './assets/help.svg', isAuthorized: false},
    {path: `/${ROUTING.LOGIN}`, name: 'Login', iconImage: './assets/login.svg', isAuthorized: false},
    {path: `/${ROUTING.LOGOUT}`, name: 'Logout', iconImage: './assets/logout.svg', isAuthorized: true},
    {path: `/${ROUTING.REGISTRATION}`, name: 'Registration', iconImage: './assets/registration.svg', isAuthorized: false}
];

export const MAIN_ROUTE: NavigationRoute = {path: `/${ROUTING.BASE}`};
