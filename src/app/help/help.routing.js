import { RouterModule } from '@angular/router';

import { HelpComponent } from './help.component';

export const routes = [
    { path: '', component: HelpComponent}
];

export const routing = RouterModule.forChild(routes);
