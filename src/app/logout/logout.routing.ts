import { RouterModule } from '@angular/router';

import { LogoutComponent } from './logout.component';

export const routes = [
    { path: '', component: LogoutComponent }
];

export const routing = RouterModule.forChild(routes);
