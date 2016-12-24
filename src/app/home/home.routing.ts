import { RouterModule } from '@angular/router';

import HOME_ROUTING_CONFIG from './home.routing.config';
import { HomeComponent } from './home.component';
import { HomeResolveService } from './home-resolve.service';

export const routes = [
    {
        path: '',
        children: [
            {
                path: HOME_ROUTING_CONFIG.BASE,
                component: HomeComponent,
                resolve: {
                    viewList: HomeResolveService
                }
            },
            {
                path: HOME_ROUTING_CONFIG.CONSTRUCTOR,
                loadChildren: () => require('es6-promise!../constructor/constructor.module')('ConstructorModule')
            }
        ]
    },

];

export const routing = RouterModule.forChild(routes);
