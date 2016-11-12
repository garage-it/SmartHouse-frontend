import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardResolveService } from './dashboard-resolve.service';
import { DashboardEditorComponent } from './dashboard-editor/dashboard-editor.component';

export const routes = [
    { path: '', component: DashboardComponent, resolve: { widgets: DashboardResolveService } },
    { path: 'editor', component: DashboardEditorComponent }
];

export const routing = RouterModule.forChild(routes);
