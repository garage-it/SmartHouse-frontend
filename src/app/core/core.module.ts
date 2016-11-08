import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';

@NgModule({
    id: module.id,
    imports: [ CommonModule, RouterModule ],
    declarations: [ HeaderComponent, MainComponent ],
    exports: [ HeaderComponent, MainComponent ]
})
export class CoreModule {}
