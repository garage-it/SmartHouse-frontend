import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { HeaderComponent } from './header/header.component';

@NgModule({
    id: module.id,
    imports: [ CommonModule, RouterModule, ToastModule ],
    declarations: [ HeaderComponent ],
    exports: [ HeaderComponent ]
})
export class CoreModule {}
