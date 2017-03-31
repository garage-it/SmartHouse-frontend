import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

/* App Root */
import { AppComponent } from './app.component';

/* Feature modules */
import { CoreModule } from './core/core.module';
import { routing } from './app.routing';

@NgModule({
    imports: [ BrowserModule, CoreModule, routing, ToastModule.forRoot() ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
