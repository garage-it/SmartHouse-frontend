import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routing } from './statistic.routing';
import STATISTIC_DECLARATIONS from './statistic.declarations';
import { StatisticComponent } from './statistic.component';

@NgModule({
    id: module.id,
    imports: [ RouterModule, routing ],
    declarations: [ ...STATISTIC_DECLARATIONS ],
    exports: [ StatisticComponent ],
    providers: []
})
export class StatisticModule {}
