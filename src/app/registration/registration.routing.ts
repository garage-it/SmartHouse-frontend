import { RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration.component';

export const routes = [
    { path: '', component: RegistrationComponent }
];

export const routing = RouterModule.forChild(routes);
