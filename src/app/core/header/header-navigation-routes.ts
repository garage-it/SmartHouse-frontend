import { NavigationRoute } from '../navigation-route.model';
import ROUTING from '../../config.routing';

export const NAVIGATION_ROUTES: Array<NavigationRoute> = [
    {path: `/${ROUTING.SCENARIOS}`, name: 'Scenarios', iconImage: './assets/scenarioList.png', isAuthorized: true},
    {path: `/${ROUTING.STATISTIC}`, name: 'Statistic', iconImage: './assets/statistic.svg', isAuthorized: true},
    {path: `/${ROUTING.SETTINGS}`, name: 'Settings', iconImage: './assets/settings.svg', isAuthorized: true},
    {path: `/${ROUTING.HELP}`, name: 'Help', iconImage: './assets/help.svg', isAuthorized: false}
];

export const LOGIN_ROUTE: NavigationRoute = {path: `/${ROUTING.LOGIN}`, name: 'Log in', isAuthorized: false};
export const REGISTRATION_ROUTE: NavigationRoute = {path: `/${ROUTING.REGISTRATION}`, name: 'Sign Up', isAuthorized: false};
export const LOGOUT_ROUTE: NavigationRoute = {path: `/${ROUTING.LOGOUT}`, name: 'Logout', isAuthorized: true};

export const MAIN_ROUTE: NavigationRoute = {path: `/${ROUTING.BASE}`, name: 'Home', iconImage: './assets/logo.svg'};
