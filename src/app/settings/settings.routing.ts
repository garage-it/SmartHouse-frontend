import { RouterModule } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { RolesComponent } from './roles/roles.component';

export const routes = [
    {
        path: '',
        children: [
            {
                path: 'roles',
                component: RolesComponent
            },
            {
                path: 'general',
                component: GeneralComponent
            },
            {
                path: '**',
                redirectTo: 'general',
                pathMatch: 'full'
            }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
