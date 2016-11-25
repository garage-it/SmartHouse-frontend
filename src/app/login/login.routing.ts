import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

export const routes = [
    { path: '', component: LoginComponent },
    { path: 'error/:error', component: LoginComponent }
    // ,
    // { path: 'fb-callback', component: FbCallbackComponent }
];

export const routing = RouterModule.forChild(routes);
