import { NavigationRoute } from '../core/navigation-route.model';
import ROUTING from '../config.routing';

export const NAVIGATION_ROUTES: Array<NavigationRoute> = [
    { path: `/${ROUTING.SETTINGS}/general`, name: 'General' },
    { path: `/${ROUTING.SETTINGS}/roles`, name: 'Roles', isAuthorized: true, roles: ['admin'] },
    { path: `/${ROUTING.SETTINGS}/devices`, name: 'Devices', isAuthorized: true }
];
