// @TODO: entire project has to be fefactored  and moved to @ngModule
import SensorDetailService from './devices/details/sensor-detail.service';
import { SensorDetailListResolveService } from './devices';

import DashboardService from './dashboard/dashboard.service';
import { DashboardResolveService } from './dashboard/dashboard-resolve.service';

import { ScenarioService } from './scenarios/shared/Scenario.service';
import {ScenarioListResolveService} from './scenarios/scenarios-list/scenario-list.resolve.service';

import ShHttpService from './shared/sh-http/sh-http.service';
import {HTTP_PROVIDERS} from '@angular/http';

export default [
    HTTP_PROVIDERS,
    ShHttpService,

    SensorDetailService,
    SensorDetailListResolveService,

    DashboardService,
    DashboardResolveService,

    ScenarioService,
    ScenarioListResolveService
];
