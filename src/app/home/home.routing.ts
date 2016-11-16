import { RouterModule } from '@angular/router';

import HOME_ROUTING_CONFIG from './home.routing.config';
import { HomeComponent } from './home.component';

export const routes = [
    {
        path: HOME_ROUTING_CONFIG.BASE,
        component: HomeComponent
    }
];

export const routing = RouterModule.forChild(routes);
