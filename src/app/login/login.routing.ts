import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

export const routes = [
    { path: '', component: LoginComponent },
    { path: ':error', component: LoginComponent }
];

export const routing = RouterModule.forChild(routes);
