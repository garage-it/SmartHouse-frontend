import { RouterModule } from '@angular/router';

import { ConstructorComponent } from './constructor.component';

export const routes = [
    {
        path: '',
        component: ConstructorComponent
    }
];

export const routing = RouterModule.forChild(routes);
