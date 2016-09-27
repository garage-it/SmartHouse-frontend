import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';

@NgModule({
    module: module.id,
    imports: [ CommonModule, RouterModule ],
    declarations: [ HeaderComponent ],
    exports: [ HeaderComponent ]
})
export class CoreModule {}
